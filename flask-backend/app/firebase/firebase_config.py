import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os

# Replace the path with the path to your service account key file
# print(os.getcwd())
cred = credentials.Certificate(os.path.join(os.getcwd(),'app/firebase/cropkart-prod-firebase-adminsdk-2hsle-8b9e51c11e.json'))
firebase_admin.initialize_app(cred)

db = firestore.client()


#To test connection
# doc_ref = db.collection(u'fleet').document(u'aA6vWonPVyaCnAyandhn')

# doc = doc_ref.get()
# if doc.exists:
#     print(f'Document data: {doc.to_dict()}')
# else:
#     print(u'No such document!')
