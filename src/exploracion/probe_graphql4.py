"""Sondeo 4: categorías correctas + municipios de La Habana."""
import requests

GRAPHQL = "https://graphql-api.revolico.app/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Content-Type": "application/json",
    "Origin": "https://www.revolico.com",
}

CATEGORIES = """
query CategoriesSelect($hasDescription: Boolean!) {
  categories {
    id
    title
    slug
    order
    subcategories {
      id
      title
      slug
    }
    description @include(if: $hasDescription)
  }
}
"""

PROVINCES = """
query ProvincesWithMunicipalities {
  provinces {
    id
    name
    slug
    municipalities {
      id
      name
      slug
    }
  }
}
"""


def post(query, variables):
    r = requests.post(GRAPHQL, headers=HEADERS,
                      json={"query": query, "variables": variables}, timeout=30)
    return r.json()


print("### CATEGORÍAS ###")
data = post(CATEGORIES, {"hasDescription": False})
for c in data["data"]["categories"]:
    print(f"CAT {c['title']} (id={c['id']}, slug={c['slug']})")
    for sc in c["subcategories"]:
        print(f"    SUB {sc['title']} (id={sc['id']}, slug={sc['slug']})")

print()
print("### MUNICIPIOS DE LA HABANA ###")
data = post(PROVINCES, {})
for p in data["data"]["provinces"]:
    if p["name"] == "La Habana":
        for m in p["municipalities"]:
            print(f"  {m['name']} (id={m['id']}, slug={m['slug']})")