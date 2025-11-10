let next= document.querySelector('.next-seg')
let prev= document.querySelector('.prev-seg')


next.addEventListener('click', function(){
    let items= document.querySelectorAll('.back-seguros')      
    document.querySelector('.slide-seguros').appendChild(items[0])                
})

prev.addEventListener('click', function(){
    let items= document.querySelectorAll('.back-seguros')      
    document.querySelector('.slide-seguros').prepend(items[items.length - 1])                
})
