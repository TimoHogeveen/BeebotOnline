$('.categorydropdown').on('input', function(){ 
    var id = $(this).val();

$.ajax({

url:'mats/'+id,
method: 'GET',
dataType: 'html',


}).done(function(response){
    console.log(response);
    $('.mattendropdown').html(response);
})



})





