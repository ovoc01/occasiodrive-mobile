import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MDQ4ODcwODMsImV4cCI6MTcwNDg4ODUyM30.FrUdNr1_-Z3rgE_Icoo6EBhXZ4YH6CAJuKYft9-YJlE"
const headers = {
    "Content-Type":"multipart/form-data",
    "Authorizations": "Bearer " + token,
};

const body = {
    "email":"admin@gmail.com",
    "password":"admin"
};


const jsonHeaders = {
  "Content-Type": "application/json",
  "Authorizations": "Bearer " + token,
};

const jsonBody = {
  description: "This is a description",
  dateAnnounces: "2023-04-02",
  sellingPrice: 4500,
};

axios.post("http://localhost:7070/api/v1/announces",jsonBody,{jsonHeaders})
    .then(response=>{
        if(response.status===201){
            const uploadPayload = {
                "file":""
            }

            axios.post("http://localhost:7070/api/v1/announces/upload",uploadPayload,{headers})
            .then(response=>{
                console.log("upload success")
            }).catch(error=>{
                console.log(error.message)
            });

        }
        

        
    }).catch(error=>{
        if(error.response){
            console.log(error.response.status)
        }
    });
