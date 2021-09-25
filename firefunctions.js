const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

if(firebase.apps.length == 0)
{
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
db.settings({ timestampInSnapshots: true });



// default functions
function getData(collection, document)
{
    let data = [];
    return new Promise((resolve, reject) => {

        db.collection(collection).get().then(snapshot => {
            docs = snapshot.docs

            docs.forEach(doc => {

                documentName = doc.id

                if(document == "*")
                {
                    data.push(doc.data())
                }

                if(document != "*")
                {
                    if(document == documentName)
                    {
                        data = doc.data()
                    }
                }
                
            })


            resolve(data)
            
        })

        if(data == [])
        {
            reject("Collection data not found")
        }

    })
}
function setData(collection, document, datatoSet)
{
    
    console.log(collection + " " + document + " " + datatoSet)
    db.collection(collection).doc(document).set(datatoSet)
}
async function docExists(collection, document)
{
    const userDocRef = await db.collection(collection).doc(document);
   const doc = await userDocRef.get();
   if (!doc.exists) {
     return false
   } else {
     return true
   }
}

// default functions