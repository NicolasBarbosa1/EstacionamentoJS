(function (){
    const $ = q => document.querySelector(q)

    function convertPeriod(mili){
        const min = Math.floor(mili / 60000); 
        const sec = Math.floor((mili % 60000) / 1000);
         return `${min}m e ${sec}s`;
    }
    function renderGaragem(){
            const garagem = getGaragem();
            $("#garagem").innerHTML = "";
            garagem.forEach(c => addCarGaragem(c))
    }

    function addCarGaragem (car) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${car.name}</td>
        <td>${car.license}</td>
        <td data-time="${car.time}">${new Date(car.time).
            toLocaleString("pt-BR",{hour: "numeric", minute: "numeric"})}</td>
        <td>
            <button class ='delete'>Deleta</button>

        </td>
        `;

          $("#garagem").appendChild(row);      
        
    };
    function checkOut(info){
        let period = new Date () - new Date(info[2].dataset.time);
        period = convertPeriod(period);
        const license = info[1].textContent;
        const msg = `O veiculo ${info[0].textContent} de placa ${license} permaneceu estacionado por ${period}
        Deseja encerrar?`;
        if(!confirm(msg)) return;
        const garagem = getGaragem().filter(c => c.license !== license);
        localStorage.garagem = JSON.stringify(garagem);
        renderGaragem();
    }

    const getGaragem = () => localStorage.garagem ? JSON.parse(localStorage.garagem) : [];
    
    renderGaragem();

$('#send').addEventListener('click', e=> {
    const name = $('#name').value;
    const license = $('#license').value;
    if(!name || !license){
        alert("Os campos são obrigatórios");
        return;
    }
    const car = { name, license, time: new Date()}
    const garagem = getGaragem();
    garagem.push(car);
    localStorage.garagem = JSON.stringify(garagem);

    addCarGaragem(car);

    $('#name').value ="";
    $('#license').value = "";
});

$('#garagem').addEventListener("click", e => {
    if(e.target.className = 'delete')
    checkOut(e.target.parentElement.parentElement.cells);
});
})();
