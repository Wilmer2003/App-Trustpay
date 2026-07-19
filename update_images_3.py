import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

products = {
    '308': 'https://images.unsplash.com/photo-1577401239170-897940551f78?auto=format&fit=crop&w=800&q=80',
    '309': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    '310': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    '401': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    '402': 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=800&q=80',
    '403': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    '404': 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    '405': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    '406': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80',
    '407': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    '408': 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=800&q=80',
    '409': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    '410': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
    '501': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    '502': 'https://images.unsplash.com/photo-1627308595229-7830f5c90662?auto=format&fit=crop&w=800&q=80',
    '601': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    '701': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    '801': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    '901': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    '1001': 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    '1101': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    '1201': 'https://images.unsplash.com/photo-1550572017-edb799988225?auto=format&fit=crop&w=800&q=80',
    '1301': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
}

businesses = {
    '13': {'img': 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80', 'portada': 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80'}
}

for item_id, url in products.items():
    if f"id: {item_id}," in content:
        pattern = r'(\{.*?id:\s*' + item_id + r',.*?emoji:\s*\'.*?\'\s*)(\})'
        def repl(m):
            if 'img:' not in m.group(1):
                return m.group(1) + f", img: '{url}' " + m.group(2)
            return m.group(0)
        content = re.sub(pattern, repl, content)

for b_id, assets in businesses.items():
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
