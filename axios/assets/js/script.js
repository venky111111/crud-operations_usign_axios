let url='http://localhost:3000/students';
var cont='';
var mainData=[];


//get
function loadData(){
    axios.get(url)
    .then(response => {
        let data=response.data;
        mainData=data;
        console.log(mainData);  
        getData();
        
    })

}
function getData(){

    mainData.forEach(person=>{
   
        cont+=`<tr >
            <th scope="row">${person.id}</th>
            <td>${person.name}</td>
            <td>${person.branch}</td>
            <td><button class="btn text-primary" onclick='upd(${person.id})'><i class="fa fa-edit" style="font-size:25px"></i></button></td>
            <td><button class="btn text-danger" onclick='deleteRecord(${person.id})'><i class="material-icons" style="font-size:25px">delete</i></button></td>
          </tr>`
      })
      document.getElementById('bodyy').innerHTML=cont;
}
//post
function give(){
    let id1=$("#uId").val();
    var id2 = parseInt(id1);
    let name1=$("#name").val();
    let branch1=$("#branch").val();
   
    if(id1===''&&name1===''&&branch1===''){
        alert("please fill all the input fields");
      
    }
    else{
       

        let name2 = { id: id2, name: name1, branch: branch1 };

        // Using Axios for the POST request
        axios.post(url, name2, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            // Assuming the server response is in JSON format
            const data = response.data;
            mainData.push(data);
        })
        .catch(error => {
            console.error('Error adding information:', error);
            alert("Use Unique Id");
        });
    
    }
   
}
function upd(id){
    let mm = mainData.find(item => item.id === id);
        console.log(id, "      ", mainData);
        console.log("mm ", mm);
        $("#uId").val(mm.id);
        $("#name").val(mm.name);
        $("#branch").val(mm.branch);
        
        $("#ubtn").css("display", "block");
        $("#sebtn").css("display", "none");
        $("#uppH").css("display", "block");
        $("#instH").css("display", "none");
        let btn = $("#ubtn");
        btn.on('click', function(event) 
        {
            let idd = $("#uId").val();
            let name = $("#name").val();
            let branch1 = $("#branch").val();
            if(idd===''&&name===''&&branch1===''){
                alert("Please Dont give empty fields..!");
            }
            else
            {
                let data = { id: idd, name: name,branch: branch1 };
                console.log("Updating data:", data);
                axios.put(`${url}/${idd}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        const updatedData = response.data;
                        console.log("Updated data:", updatedData);
                
                        $("#uId").val('');
                        $("#name").val('');
                        $("#mail").val('');
                
                        $("#ubtn").hide();
                    })
                    .catch(error => {
                        alert(error);
                    });
                
                
            }
        })
        
}

function deleteRecord(id) {
    alert("The data is deleted...!");

    axios.delete(`${url}/${id}`)
        .then(response => {
            // Handle the response, if needed
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
    
