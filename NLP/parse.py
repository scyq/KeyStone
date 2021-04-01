import pandas as pd
from gensim.models import Word2Vec
from gensim.models.word2vec import LineSentence

CSV_FILE_PATH = './tags.csv'
df = pd.read_csv(CSV_FILE_PATH)
sentences = df['Layout']
line_sent = []
for s in sentences:
    line_sent.append(s.split())

model = Word2Vec(line_sent, size=300, window=5, min_count=1, workers=2)
model.save('./w2v.model')
for i in model.vocab:
    print(i)
print(model.wv('博客'))