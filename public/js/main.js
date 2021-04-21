$('.categorydropdown').on('input', function(){ 
    var id = $(this).val();

$.ajax({

url:'mats/'+id,
method: 'GET',
dataType: 'html',


}).done(function(response){
    console.log(response);
    //$('.mattendropdown').empty(); // <<<<<< No more issue here

    //$.each(response.matten, function(id) {
        //$('.mattendropdown').append( new Option(response.matten[id]) );
        $('.mattendropdown').html(response);
    //});

})



})





