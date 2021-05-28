function isInputNumber(evt) {
    var ch = String.fromCharCode(evt.which);
    if (!/[0-9]/.test(ch)) {
        evt.preventDefault();
    }
}
function buttonFunc() {



    let numbers = document.getElementById("inputArea").value;
    if (numbers == "") {
        alert("Lütfen veri giriniz!");
        return -1;
    }

    let numberList = numbers.split(",");
    if (numberList.length == 1) {
        alert("Lütfen en az iki karakter giriniz!");
        return -1;
    }

    for (let index = 0; index < numberList.length; index++) {
        const element = numberList[index];
        if (isNaN(parseFloat(element))) {
            alert("Lütfen sayı giriniz!");
            return false;
        }
    }

    document.getElementById("outputLabel").style.display = "block";
    document.getElementById("sonuclarSection").style.display = "block";
    document.getElementById("resetleButton").style.display = "inline-block";
    document.getElementById("grafik").style.display = "block";

    let resultAritmetik = aritmetikOrt(numberList);
    let resultHarmonik = harmonikOrt(numberList);
    let resultGeometrik =
        typeof geometrikOrt(numberList) == "string"
            ? geometrikOrt(numberList)
            : geometrikOrt(numberList).toFixed(3);
    let resultSapma = standartSapmaFunc(numberList);
    let resultMedyan = medyanBulmaFunc(numberList);
    let valuesMod = modBulmaFunc(numberList);
    let resultOrtalamaSapma = ortalamaSapmaFunc(numberList);
    let resultVaryans = varyansFunc(numberList);
    let resultSayiAdedi = sayiAdediFunc(numberList);
    let drawHistogram = drawChart(numberList);


    let sayiAdediSonuc = document.getElementById("sayiAdediSonuc");
    let aritmetikOrtalamaSonuc = document.getElementById("aritmetikOrtalamaSonuc");
    let harmonikOrtalamaSonuc = document.getElementById("harmonikOrtalamaSonuc");
    let geometrikOrtalamaSonuc = document.getElementById("geometrikOrtalamaSonuc");
    let standartSapmaSonuc = document.getElementById("standartSapmaSonuc");
    let medyanSonuc = document.getElementById("medyanSonuc");
    let modSonuc = document.getElementById("modSonuc");
    let ortalamaSapmaSonuc = document.getElementById("ortalamaSapmaSonuc");
    let varyansSonuc = document.getElementById("varyansSonuc");

    sayiAdediSonuc.innerHTML = resultSayiAdedi;
    aritmetikOrtalamaSonuc.innerHTML = resultAritmetik.toFixed(3);
    harmonikOrtalamaSonuc.innerHTML = resultHarmonik.toFixed(3);
    geometrikOrtalamaSonuc.innerHTML = resultGeometrik;
    standartSapmaSonuc.innerHTML = resultSapma.toFixed(3);
    medyanSonuc.innerHTML = resultMedyan;
    modSonuc.innerHTML = valuesMod[0][0] == "Mod Yoktur" ? "Mod Yoktur!" : ("Mod: " + valuesMod[0][0] + ", " + "Frekans: " + valuesMod[0][1]);

    ortalamaSapmaSonuc.innerHTML = resultOrtalamaSapma.toFixed(3);
    varyansSonuc.innerHTML = resultVaryans.toFixed(3);

    var sonuc =
        "Sayı Adedi: " +
        resultSayiAdedi +
        " \n" +
        " \n" +
        "Aritmetik Ortalama: " +
        resultAritmetik.toFixed(3) +
        " \n" +
        " \n" +
        "Harmonik Ortalama: " +
        resultHarmonik.toFixed(3) +
        " \n" +
        " \n" +
        "Geometrik Ortalama: " +
        resultGeometrik +
        " \n" +
        " \n" +
        "Standart Sapma: " +
        resultSapma.toFixed(3) +
        " \n" +
        " \n" +
        "Medyan: " +
        resultMedyan +
        " \n" +
        " \n" +
        "Mod: " +
        valuesMod[0][0] +
        " " +
        " Frekans: " +
        valuesMod[0][1] +
        " \n" +
        " \n" +
        "Ortalama Sapma: " +
        resultOrtalamaSapma.toFixed(3) +
        " \n" +
        " \n" +
        "Varyans: " +
        resultVaryans.toFixed(3) +
        " \n";

}
function aritmetikOrt(numberList) {
    let total = 0;

    for (let i = 0; i < numberList.length; i++) {
        total += parseFloat(numberList[i]);
    }
    return total / numberList.length;
}
function harmonikOrt(numberList) {
    let total = 0;
    let arrayLength = numberList.length;
    for (let i = 0; i < arrayLength; i++) {
        total += 1 / parseFloat(numberList[i]);
    }
    return arrayLength / total;
}
function geometrikOrt(numberList) {
    let total = 1;
    let arrayLength = numberList.length;
    for (let i = 0; i < arrayLength; i++) {
        total *= parseFloat(numberList[i]);
    }
    const geoOrt = Math.pow(total, 1 / arrayLength);
    if (isNaN(geoOrt)) {
        return "Geometrik ortalama sadece verilerinizin tamamı pozitif olduğunda hesaplanabilir.";
    }
    return geoOrt;
}
function standartSapmaFunc(numberList) {
    let total = 0;
    aritOrt = aritmetikOrt(numberList);
    let arrayLength = numberList.length;
    for (let i = 0; i < arrayLength; i++) {
        total += Math.pow(aritOrt - parseFloat(numberList[i]), 2);
    }
    total = total / (arrayLength - 1);
    return Math.pow(total, 1 / 2);
}
function countFunc(numberList, currentNumber) {
    let count = 0;
    for (let i = 0; i < numberList.length; i++) {
        if (currentNumber == numberList[i]) {
            count++;
        }
    }
    return count;
}
function modBulmaFunc(numberList) {
    let liste = [];
    numberList.forEach((number) => {
        liste.push(parseFloat(number.trim()));
    });

    let liste2 = [];
    for (let i = 0; i < liste.length; i++) {
        if (!liste2.includes(liste[i])) {
            liste2.push(liste[i]);
        }
    }
    let adetList = [];
    for (let j = 0; j < liste2.length; j++) {
        let adet = 0;
        for (let k = 0; k < liste.length; k++) {
            if (liste[k] == liste2[j]) {
                adet++;
            }
        }
        adetList.push([liste2[j], adet]);
    }
    let frekans = -1;
    for (let i = 0; i < adetList.length; i++) {
        if (adetList[i][1] > frekans) frekans = adetList[i][1];
    }
    let sonuc = [];
    for (let i = 0; i < adetList.length; i++) {
        if (adetList[i][1] == frekans) sonuc.push(adetList[i][0]);
    }

    let result =
        frekans != 1
            ? [[sonuc, frekans]]
            : [["Mod Yoktur", "Tüm sayılar yalnızca 1 kere tekrar etmiş"]];

    return result;
}
function medyanBulmaFunc(numberList) {
    let sayiListesi = [];
    numberList.forEach((number) => {
        sayiListesi.push(parseFloat(number.trim()));
    });
    sortedSayiListesi = sayiListesi.sort(function (a, b) { return a - b });
    let length = sortedSayiListesi.length;
    if (length % 2 != 0) {
        let index = (length + 1) / 2 - 1;
        return sortedSayiListesi[index];
    } else {
        let index1 = length / 2 - 1;
        let index2 = length / 2;
        let medyan1 = parseFloat(sortedSayiListesi[index1]);
        let medyan2 = parseFloat(sortedSayiListesi[index2]);
        return ((medyan1 + medyan2) / 2);
    }
}
function ortalamaSapmaFunc(numberList) {
    let aritmetik = aritmetikOrt(numberList);
    let parametreSayi = parseFloat(numberList.length);
    var toplam = 0;
    numberList.forEach(function (item, i) {
        toplam += Math.abs(parseFloat(item) - parseFloat(aritmetik));
    });

    return toplam / parametreSayi;
}
function varyansFunc(numberList) {
    let result = standartSapmaFunc(numberList);
    return result * result;
}
function sayiAdediFunc(numberList) {
    return numberList.length;
}
function resetleFunc() {
    location.reload();
}
function copyClipBoard() {
    const testData = document.getElementById("testData");
    const textArea = document.createElement("textarea");
    textArea.value = testData.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
}
function drawChart(numberList) {



    let repeatNumbers = [];

    let numberListNotRepeat = [];

    let sayac = 0;
    for (j = 0; j < numberList.length; j++) {
        for (k = 0; k < numberList.length; k++) {
            if (numberList[j].trim() == numberList[k].trim()) {
                for (l = 0; l < j; l++) {
                    if (numberList[l].trim() == numberList[j].trim()) {
                        sayac = -1;
                    }
                }
                sayac++;
            }
        }

        if (sayac != 0) {
            numberListNotRepeat.push(numberList[j]);
            repeatNumbers.push(sayac);
        }

        sayac = 0;
    }

    let trace1 = {
        x: numberListNotRepeat,
        y: repeatNumbers,
        type: 'bar'
    };




    let data = [trace1];

    Plotly.newPlot('myDiv', data);
}
