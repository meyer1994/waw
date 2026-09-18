#!/usr/bin/env python3
"""Regenera schemas/processo.yml a partir de respuestas reales de la API.

El openapi-senado.json publicado por el Senado referencia
`schemas/processo.yml#/components/schemas/Processo` (detalle de proceso),
pero ese archivo NO se publica aguas arriba (ni en el spec local ni en
v3/api-docs, y el servidor devuelve 404). Este script reconstruye el
schema a partir de respuestas reales de `GET /dadosabertos/processo/{id}`.

Uso:
    python3 scripts/gen-senado-processo-schema.py /tmp/pd1.json /tmp/pd2.json ...
"""

import json
import sys
from collections import defaultdict

samples = []
for path in sys.argv[1:]:
    with open(path) as f:
        data = json.load(f)
        if isinstance(data, dict) and "id" in data:
            samples.append(data)

if not samples:
    print("no sample payloads given", file=sys.stderr)
    sys.exit(1)


def merge_types(types):
    t = set(types)
    if "integer" in t and "number" in t:
        t.discard("number")
    if "null" in t:
        t.discard("null")
    if len(t) == 1:
        return next(iter(t)), True
    if not t:
        return None, True
    # mezcla: si quedan varios, preferir el menos específico
    order = ["object", "array", "string", "boolean"]
    for o in order:
        if o in t:
            return o, False
    return next(iter(t)), False


def infer(value, depth=0):
    if value is None:
        return {}
    if isinstance(value, bool):
        return {"type": "boolean"}
    if isinstance(value, int):
        return {"type": "integer", "format": "int64"}
    if isinstance(value, float):
        return {"type": "number"}
    if isinstance(value, str):
        return {"type": "string"}
    if isinstance(value, list):
        items = [infer(v, depth + 1) for v in value if v is not None]
        return {"type": "array", "items": merge_items(items)}
    if isinstance(value, dict):
        props = {}
        for k, v in value.items():
            if v is None and k not in ("comissaoMpv",):
                continue
            props[k] = infer(v, depth + 1)
        return {"type": "object", "properties": props}
    return {}


def merge_items(items):
    if not items:
        return {}
    # fusiona propiedades de todos los ítems observados
    props = defaultdict(list)
    merged = {}
    for it in items:
        for k, v in it.get("properties", {}).items():
            props[k].append(v)
    for k, vs in props.items():
        types = [v.get("type") for v in vs]
        t, exact = merge_types([x for x in types if x])
        if not t:
            merged[k] = {}
        elif t == "object":
            merged[k] = merge_items([v for v in vs if v.get("type") == "object" and "properties" in v])
        elif t == "array":
            sub = [v.get("items") for v in vs if v.get("type") == "array" and v.get("items")]
            merged[k] = {"type": "array", "items": merge_items(sub) if sub else {}}
        else:
            merged[k] = {"type": t}
    return {"type": "object" if props else "array", "properties": merged} if props else {}


root_props = defaultdict(list)
for s in samples:
    for k, v in s.items():
        root_props[k].append(v)

properties = {}
for k, vs in root_props.items():
    inferred = [infer(v) for v in vs]
    types = [i.get("type") for i in inferred]
    t, exact = merge_types([x for x in types if x])
    if not t:
        properties[k] = {}
    elif t == "object":
        properties[k] = merge_items([i for i in inferred if i.get("type") == "object"])
    elif t == "array":
        sub = [i.get("items") for i in inferred if i.get("type") == "array" and i.get("items")]
        properties[k] = {"type": "array", "items": merge_items(sub) if sub else {}}
    else:
        properties[k] = {"type": t}

schema = {
    "type": "object",
    "description": (
        "Detalle completo de un Proceso Legislativo. Schema reconstruido a "
        "partir de respuestas reales de GET /dadosabertos/processo/{id} porque "
        "el archivo schemas/processo.yml referenciado por el OpenAPI oficial "
        "no se publica."
    ),
    "properties": properties,
}

out = {
    "openapi": "3.1.0",
    "info": {"title": "Processo (detalle) — reconstruido", "version": "derived"},
    "components": {"schemas": {"Processo": schema}},
}

import yaml  # noqa: E402

with open("schemas/processo.yml", "w") as f:
    yaml.safe_dump(out, f, sort_keys=False, allow_unicode=True, width=120)

print(f"✓ schemas/processo.yml generado con {len(properties)} propiedades raíz")