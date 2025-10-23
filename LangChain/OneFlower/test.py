import chardet

with open('flowers_with_descriptions.csv', 'rb') as f:
    result = chardet.detect(f.read())
    print(f"Detected encoding: {result['encoding']}")
