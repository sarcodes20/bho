#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Mirrors data/metals.ts + data/company.ts into the dependency-free static
# build as plain globals (static-preview/assets/data.js).
#
# The static preview runs from file:// where ES modules are blocked by CORS,
# so the mirror uses classic-script globals rather than exports.
#
# Run from the project root:  bash tools/build-static-data.sh
# ---------------------------------------------------------------------------
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
out="$root/static-preview/assets/data.js"

{
  echo "/* GENERATED — do not edit."
  echo "   Source: data/metals.ts, data/company.ts"
  echo "   Regenerate: bash tools/build-static-data.sh"
  echo "*/"
  echo

  # metals.ts — drop the type import, publish as a global.
  sed -e '/^import type/d' \
      -e 's/^export const METALS: Metal\[\] = \[/window.METALS = [/' \
      "$root/data/metals.ts"

  echo

  # company.ts — drop the multi-line type import, strip `as X[]` / `as const`
  # assertions, publish as a global, and rewrite public/ image paths so they
  # resolve from static-preview/ over file://.
  sed -e '/^import type {/,/^} from ".\/types";$/d' \
      -e 's/^export const COMPANY = {/window.COMPANY = {/' \
      -e 's/ as \(Milestone\|Capability\|FlowStep\|Principle\|Specimen\|NavItem\)\[\]//g' \
      -e 's/^} as const;$/};/' \
      -e 's#"/images/#"../public/images/#g' \
      "$root/data/company.ts"
} > "$out"

echo "wrote $out"
