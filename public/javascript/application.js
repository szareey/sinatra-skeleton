function listAll(){
  $.ajax('/contacts').done(function(contacts){
    $('#display').empty();
    for (var i=0; i < contacts.length; i++){
      displayContact(contacts[i]);
    }
  });
}

function findContact(contact_id){
  return $.ajax('/contacts/'+ contact_id).done(function(contact){
    displayContact(contact);
  });
}

function displayContact(contact){
  $('#display').append('<li>'+ contact.name +'<button class="delete">&times;</button>' +'<button class="edit"> edit</button>' +'</li>');
  $('#display > li').last().attr('data-id', contact.id);
}

function createContact(){
  $.ajax({
    type: "POST",
    url:'/contacts',
    data: $("#create_contact").serialize()
    });
}

function deleteContact(id){
  return $.ajax({
    type: "DELETE",
    url: '/contacts/' + id
  });
}

function updateContact(){
   $.ajax({
    type: "PATCH",
    url: '/contacts/' + $('#create_contact > input[name="contact_id"]').val(),
    data: $("#create_contact").serialize()
  });
}

$(document).ready(function() {
  
  $('#create_contact').hide();
  
  $('#list').submit(function(event){
    event.preventDefault();
    listAll();
  });

  $('#search_by_id').submit(function(event){
    event.preventDefault();
    findContact($('#contact_id').val());
  });

  $('#display_contact_form').submit(function(event){
    event.preventDefault();
    $('#create_contact').toggle();
  });

  $('#create_contact').submit(function(event){
    event.preventDefault();
    if ($(this).class == 'update') {
      updateContact();
    }
    else {
      createContact();
    }
  });

  $('#display').on('click', 'button.delete', function(e){
    deleteContact($(this).closest('li').data('id')).done(function(){
      $(e.target).closest('li').fadeOut();  
    });
  });

  $('#display').on('click', 'button.edit', function(e){
    

    //TODO: Edit button needs work to prevent errors when NEW button is pressed. retrieve ID of the user and retrieve info of the user
    findContact($(this).closest('li').data('id')).done(function(contact){
      // select the input field and set it equal to the contact#
      $('#create_contact > input[name="name"]').val(contact.name);
      $('#create_contact > input[name="email"]').val(contact.email);
      $('#create_contact > input[name="phone"]').val(contact.phone);
      $('#create_contact > input[name="contact_id"]').val(contact.id);
      $('#create_contact').toggle();
      $('#create_contact button').text('Update').addClass('update');
    });

  });

});
