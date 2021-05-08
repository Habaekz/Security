import numpy as np
from sklearn.preprocessing import OneHotEncoder

'''
You may define any necessary encoder here to preprocess the raw data.

Here are some examples from Workshop 9:

# Two values
sex_enc = OneHotEncoder(
    categories=[np.array(['female','male'])],
    drop='first')
sex_enc.fit(np.array(['female','male']).reshape(-1,1))

# More than two values
embark_enc = OneHotEncoder(
    categories=[np.array(['C','Q','S','UNK'])],
    drop=None)
embark_enc.fit(np.array(['C','Q','S','UNK']).reshape(-1,1))
'''
# YOUR CODE HERE
sex_enc = OneHotEncoder(
    categories=[np.array(['female','male'])],
    drop='first')
sex_enc.fit(np.array(['female','male']).reshape(-1,1))

# More than two values
embark_enc = OneHotEncoder(
    categories=[np.array(['C','Q','S','UNK'])],
    drop=None)
embark_enc.fit(np.array(['C','Q','S','UNK']).reshape(-1,1))



def preprocess(data):
    '''Convert from a dict to a vector.'''
    # One-hot encoding - Sex
    sex_v = np.array([data['sex']]).reshape(-1,1)
    # YOUR CODE HERE
    sex_v = sex_enc.transform(sex_v).toarray()
    print(sex_v)

    # One-hot encoding - Embarked
    #embark_v = np.array([data['Embarked']]).reshape(-1,1)
    # YOUR CODE HERE
    #embark_v = embark_enc.transform(embark_v).toarray()
    #print(embark_v)

    # Make sure that the input feature is the same
    


    # YOUR CODE HERE
    value = [ 
        data['age'],
        sex_v[0][0],
        data['num1'],
        data['num2'],
        data['num3'],
        data['num4'],
        data['num5'],
        data['ord1'],
        data['ord2'],
        data['ord3'],
    ]
    print(value)

    return np.array(value)