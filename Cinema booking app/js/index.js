const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const selectMovie = document.getElementById('movie');
const AllSeats = document.querySelectorAll('.seat:not(.reversed)');

getfromLocalStorage()
calculateTotal()

container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');  
        calculateTotal();
    }
});

selectMovie.addEventListener('change',function(e){
    calculateTotal();
});

function calculateTotal() {
    let SelectSeats = container.querySelectorAll('.seat.selected');

    const SelectSeatsArr = [];
    const AllSeatsArr =[];

    SelectSeats.forEach(function(seat){
        SelectSeatsArr.push(seat);
    });

    AllSeats.forEach(function(seat){
        AllSeatsArr.push(seat);
    });

    let SelectSeatIndexs = SelectSeatsArr.map(function(seat){
        return AllSeatsArr.indexOf(seat);
    });

    let SelectedSeatCount = SelectSeats.length;
    count.innerText = SelectedSeatCount;
    amount.innerText = SelectedSeatCount * selectMovie.value;

    saveToLocatStorage(SelectSeatIndexs);
};

function getfromLocalStorage() {
    const SelectSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(SelectSeats != null && SelectSeats.length > 0){
        AllSeats.forEach(function(seat,index){
            if(SelectSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectMoiveIndex = JSON.parse(localStorage.getItem('selectMoiveIndex'));

    if(selectMoiveIndex != null) {
        selectMovie.selectedIndex = selectMoiveIndex;
    }
}

function saveToLocatStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectMoiveIndex',selectMovie.selectedIndex);
};