const from = document.getElementById("from");
const to = document.getElementById("to");
const input = document.getElementById("input");
const result = document.querySelector(".result");
const tableBody = document.querySelector(".tableBody");
const clearBtn = document.getElementById("clearBtn");

function creatOption(x, y, z){
    const option = document.createElement("option");
    const text = document.createTextNode(y);
    option.setAttribute("value", toNumber(z));
    option.append(text);
    x.append(option);
}


function toNumber(x){
    return Number(x.replace("," , ""));
}

for(i in data.rates){
    creatOption(from, i, data.rates[i]);
    creatOption(to, i, data.rates[i]);
}

function tableData(arr){
    let rowHider = document.getElementById("rowHider");
    if(rowHider){
        rowHider.remove();
    }
    let tr = document.createElement("tr");
    arr.map(function(el){
        let td = document.createElement("td");
        let tdData = document.createTextNode(el);
        td.appendChild(tdData);
        tr.appendChild(td);
    });
    tableBody.appendChild(tr);
}

function store(){
    localStorage.setItem("dataStore", tableBody.innerHTML);
};

document.querySelector(".content").addEventListener("submit", function(e){
    e.preventDefault();
    let inputValue = input.value;
    let fromValue = from.value;
    let toValue = to.value;
    let fromOption = inputValue+ " "+ from.options[from.selectedIndex].innerText;
    let toOption = to.options[to.selectedIndex].innerText;
    let date = new Date().toLocaleString();

    let finalResult = (inputValue * fromValue) / toValue;
    let tableResult = finalResult.toFixed(2);
    result.innerHTML = tableResult;
    let dataArr = [date,fromOption,toOption,tableResult+" "+toOption];
    tableData(dataArr);
    store();
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
    clearBtn.style.display = "block";
});

(function(){
    if(localStorage.getItem("dataStore")){
        tableBody.innerHTML = localStorage.getItem("dataStore");
        clearBtn.style.display = "block";
    }else{
        tableBody.innerHTML = `<tr id="rowHider"><td colspan="4">There is no Records.</td></tr>`;
        clearBtn.style.display = "none";
    }
})();

clearBtn.addEventListener("click", function(){
    if(localStorage.getItem("dataStore")){
        let askToDelete = confirm("Are you sure to delete records?");
        if (askToDelete){        
            localStorage.clear();
            tableBody.innerHTML = `<tr id="rowHider"><td colspan="4">There is no Records.</td></tr>`;
            result.innerHTML = "00.0";
            clearBtn.style.display = "none";
        }
    }
})
function changeMode(){
    document.body.classList.toggle("night-mode");
    document.querySelector(".fas").classList.toggle("fa-sun")
}