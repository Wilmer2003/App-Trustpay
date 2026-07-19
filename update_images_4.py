import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

businesses = {
    "4": {"img": "https://images.unsplash.com/photo-1555529733-0e670560f4e1?auto=format&fit=crop&w=800&q=80", "portada": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1200&q=80"},
    "5": {"img": "https://images.unsplash.com/photo-1544025162-8111142154ea?auto=format&fit=crop&w=800&q=80", "portada": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"},
    "6": {"img": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80", "portada": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80"},
    "7": {"img": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", "portada": "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=1200&q=80"},
    "8": {"img": "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=80", "portada": "https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1200&q=80"},
    "9": {"img": "https://images.unsplash.com/photo-1531297172864-45dcc6045866?auto=format&fit=crop&w=800&q=80", "portada": "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1200&q=80"},
    "10": {"img": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80", "portada": "https://images.unsplash.com/photo-1516734212443-3e3a0bf64396?auto=format&fit=crop&w=1200&q=80"},
    "11": {"img": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80", "portada": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80"},
    "12": {"img": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80", "portada": "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80"}
}

for b_id, assets in businesses.items():
    if f"id: {b_id}," in content or f"id:{b_id}," in content or f"id: {b_id} ," in content:
        b_pattern = r"(id:\s*" + b_id + r",.*?img:\s*')(.*?)('.*?portada:\s*')(.*?)(')"
        def b_repl(m):
            img_val = m.group(2)
            portada_val = m.group(4)
            new_img = assets['img'] if not img_val else img_val
            new_portada = assets['portada'] if not portada_val else portada_val
            return m.group(1) + new_img + m.group(3) + new_portada + m.group(5)
        content = re.sub(b_pattern, b_repl, content, flags=re.DOTALL)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)
