import re

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

products = {
    "308": "https://images.unsplash.com/photo-1577401239170-897940551f78?auto=format&fit=crop&w=800&q=80",
    "309": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
    "310": "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    "401": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    "402": "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=800&q=80",
    "403": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    "404": "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    "405": "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
    "406": "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80",
    "407": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    "408": "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=800&q=80",
    "409": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    "410": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
    "501": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    "502": "https://images.unsplash.com/photo-1627308595229-7830f5c90662?auto=format&fit=crop&w=800&q=80",
    "601": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    "701": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    "801": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    "901": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "1001": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    "1101": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    "1201": "https://images.unsplash.com/photo-1550572017-edb799988225?auto=format&fit=crop&w=800&q=80"
}

with open('js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Update products
    for item_id, url in products.items():
        if f'id: {item_id},' in line and 'img: ' not in line:
            line = re.sub(r'\}\s*,?\s*$', f", img: '{url}' }},", line)
            if not line.endswith(','):
                line = line.rstrip(',') + '\n'
            line = line.replace(',,', ',')
            
    # Update businesses
    for b_id, assets in businesses.items():
        if f'id: {b_id}, ' in line:
            if "img: ''," in line:
                line = line.replace("img: '',", f"img: '{assets['img']}',")
            if "portada: ''," in line:
                line = line.replace("portada: '',", f"portada: '{assets['portada']}',")

    new_lines.append(line)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
