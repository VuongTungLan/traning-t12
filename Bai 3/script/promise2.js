
$("#non-promise").click(function (e) {
    let a = 5;
    let b = 6;
    var tong;
    console.log("a= " + a);
    setTimeout(() => {
        b++;
        console.log("b=" + b);
        
    }, 3000);
    tong = a + b;
    console.log("tong: " + tong);
});

function increase(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            num++;
            (isNaN(num)) ? reject('khong phai so') : resolve(num);
        }, 3000);

    })
}

function sum(a, b) {
    return a + b;
}

$("#promise").click(function (e) {
    let a = 5;
    console.log("a= " + a);
    let b = 6;
    console.log("b= " + b);
    increase(b)
        .then(function (num) {
            console.log(num);
            return num;
        })
        .then((value) => {
            console.log(sum(a, value));
        }) 
        .catch((error) => {
            console.log(error);
        });
});


var animals = ['Cho', 'Meo', 'Lon', 'Ga'];
var animals2 = animals;

$("#animals").val(animals);
$("#animals2").val(animals2);

$("#change").click(function (e) { 
    e.preventDefault();
    animals2.push("cho")
    $("#animals2").val(animals2);
    $("#animals").val(animals);
});
