from stanfordcorenlp import StanfordCoreNLP
nlp = StanfordCoreNLP(path_or_host = r'/Users/yuqingchen/Documents/GitHub/Keystone/NLP', port = 9999, lang='zh')
sentence = '金角大王，是在电视剧《西游记》中登场的虚拟人物。与兄弟银角大王是平顶山莲花洞的两个妖怪。原是太上老君门下看守金炉的童子。'
print('Tokenize:', nlp.word_tokenize(sentence))    # 令牌化
print('Part of Speech:', nlp.pos_tag(sentence))    # 词性标注
print('Named Entities:', nlp.ner(sentence))        # 命名实体
print('Constituency Parsing:', nlp.parse(sentence))  # 语法树，成分句法把句子组织成短语的形式
print('Dependency Parsing:', nlp.dependency_parse(sentence))  # 依存句法 揭示句子中词的依赖关系
nlp.close()