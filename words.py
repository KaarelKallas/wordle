alphabet = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 'š', 'z', 'ž', 't', 'u', 'v', 'õ', 'ä', 'ö', 'ü']
f = open('lemmad2013.txt')
lines = [l.strip() for l in f.readlines() if len(l.strip()) == 5]
print(lines)
fw = open('words.txt', 'w')
for w in lines:
    for c in w:
        has_allowed_letter = True
        for c in w:
            if not c in alphabet:
                has_allowed_letter = False
    if has_allowed_letter:
        fw.write(w + '\n')
