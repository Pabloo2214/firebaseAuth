//importa as funções necessatias do firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js"
import { getAuth, GoogleProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js"
import { getFiretore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"

//configuração do firebase

//inicializa o firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth() //configura o firebase authentication
const db = getFiresyore() //conecta ao firestore

//monitora o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    //busca o id do usuário autenticado salvo no localStorage
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    //se o Id estiver no localStorage, tenta obter os dados do firestore
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId); //referencia ao documento do usuário no firestore

        getDoc(docRef) //Busca o documento
            .then((docSnap) => {
                //se o documento existir, exibe os dados na interface
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                    document.getElementById('loggedUserFName').innerText = userData.lastName;
                } else {
                    console.log("ID não encontrado no documento");
                }
            })
            .catch((error) => {
                console.log("documento não encontrado")
            });
    } else {
        console.log("ID não encontrado no localStorage");
    }
});

//Lógica de logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId'); //remove o ID do usuário do localStorage
    signOut(auth) //realiza o logout
        .then(() => {
            window.location.href = "index.html"; //redireciona para a página de login
        })
        .catch((error) => {
            console.error("Error Signing Out:", error);
        });
});