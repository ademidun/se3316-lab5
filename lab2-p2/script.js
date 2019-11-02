$(document).ready(function(){
    
    $("#fruitBtn").click(function(){
        var fruits = fruitList.children();
        
        console.log('fruitList.children("li:): ',fruitList.children(''));
        
        var searchTerm = document.getElementById('searchFruit').value;
        
        for (var i = 0; i < fruits.length; ++i) {
          var fruit = fruits[i];
          
          if (fruit.innerHTML==searchTerm) { //should it be ===
            //https://stackoverflow.com/questions/4805933/jquery-remove-direct-child-element
            var fruitElement = document.createElement('li');
            fruitElement.innerHTML = fruit.innerHTML
            
            basketList.append(fruitElement);
            fruit.remove();
            break;
          }
          
        }
    });
    
    var fruits = ['Apple','Orange','Mango'];
    
    var fruitList = $('#fruitList');
    var basketList = $('#basketList');
    
    console.log('fruitList: ',fruitList);
    
    for (var i = 0; i < fruits.length; i++) {
        
        var fruitElement = document.createElement('li');
        fruitElement.innerHTML = fruits[i];
        
        fruitList.append(fruitElement);
        
        console.log('fruitElement: ',fruitElement);
    }
    
});