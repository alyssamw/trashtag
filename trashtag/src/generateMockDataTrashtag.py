import json
from faker import Faker
from faker.providers import person
from faker.providers import lorem
from faker.providers import address

fake = Faker()
fake.add_provider(person)
fake.add_provider(lorem)
fake.add_provider(address)

with open('mock.json', 'w') as file:
    file.write('{"posts":[')
    for i in range(100):
        data = {}
        data['location'] = fake.address()
        data['caption'] = fake.paragraph(nb_sentences=4, variable_nb_sentences=True, ext_word_list=None)
        json.dump(data, file)
        if i !=99:
            file.write(',')
    file.write(']}')

print('Done.')


