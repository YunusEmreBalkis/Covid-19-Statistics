class Request{

    constructor(){
        this.url = "https://covid-193.p.rapidapi.com/statistics";
    }

    async get(){

        const responsek = await fetch(this.url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        const json = await responsek.json();
        const dertan = await json.response;
        return dertan;
    }
}
eventlisteners();

function eventlisteners(){

    const filterInput = document.querySelector(".form-control");
    
    filterInput.addEventListener("keyup",filter);
}

const req = new Request;

req.get().then(data => {
    
    const list = data;
    getdataToUı(list);
});


function getdataToUı(data){

    const lists = data;
    console.log(lists);
    const uto = document.querySelector("#country")
    let i = 0;

    lists.forEach(e => {

        let dn = lists[i].deaths.new;
        let cn = lists[i].cases.new;
        let dt = lists[i].deaths.total;

        dn  = (dn  === null) ? 0 : dn ;
        cn = (cn  === null) ? 0 : cn ;
        dt = (dt  === null) ? 0 : dt ;
       
        uto.innerHTML +=`        
        <tr class="ret">
        <th scope="row">${i+1}</th>
        <td >${lists[i].country}</td>
        <td >${dt}</td>
        <td >${lists[i].cases.total}</td>
        <td >${dn}</td>
        <td >${cn}</td>
      </tr>
        `
        i++;

    });
}



function filter(e){

   
   const filterValue = e.target.value.toLowerCase();
   const listItems = document.querySelectorAll(".ret");
    
   listItems.forEach(function(item){
   
       const text = item.textContent.toLowerCase();

       if(text.indexOf(filterValue) === -1){
           item.setAttribute("style","display : none !important");
       }
       else{
            item.setAttribute("style","display : ")
       }
   })
    
   
}
