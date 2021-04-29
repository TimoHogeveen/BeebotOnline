$('.categorydropdown').on('input', function(){ 
    var id = $(this).val();

$.ajax({

url:'mats/'+id,
method: 'GET',
dataType: 'html',


}).done(function(response, responseURL){
    console.log(response);
    console.log(responseURL)
    $('.mattendropdown').html(response);
})



})





