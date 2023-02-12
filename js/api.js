var BASE_URL = "http://localhost:1337"


function fetchMessages() {
    let messageLayout = '';
    fetch(`${BASE_URL}/api/messages?populate=*`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        data.data.forEach(message => {
            const messaageElement = `<div class="col-md-4 text-center">
            <div class="sermon-entry">
                <div class="sermon" style="background-image: url(${BASE_URL}${message.attributes.track_cover.data.attributes.url});">
                    <div class="play">
                        <a class="popup-vimeo" href=${BASE_URL}${message.attributes.track.data.attributes.url}><i class="icon-play3"></i></a>
                    </div>
                </div>
                <h3>${message.attributes.Title}</h3>
                <span>${message.attributes.Artist}</span>
            </div>
        </div>`;
        messageLayout += messaageElement;
        });

        document.getElementById('sermon_container').innerHTML = messageLayout;
    })
}


function sendContact(){
    const formGroups = document.getElementsByClassName("contact_input");
    console.log(formGroups);
    const name = formGroups[0].value
    const email = formGroups[1].value
    const message = formGroups[2].value
    console.log(`${name}${email}${message}`);

    
    swal({
        text: 'You want to proceed?',
        button: {
          text: "Yes, Please proceed",
          closeModal: false,
        },
      })
      .then(xx => {

        const data = {
            data: {
                name: name,
                email: email,
                message_to_church: message
            }
        }
        fetch(`${BASE_URL}/api/contacts`, {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
        },
            body: JSON.stringify(data),
        })
        .then(results => {
            console.log(results.json());
            return results;
          })
          .then(response => {
            console.log(response)
            return response
          })
          .then(ressss => console.log(ressss));
      })
      .then(json => {
        console.log(json)
        swal({
          title: "We received your message and will get back to you soon",
          text: name,
          icon: 'success',
        });
      })
      .catch(err => {
        if (err) {
          console.log(err);  
          swal("Oh noes!", "The request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
}
fetchMessages();
