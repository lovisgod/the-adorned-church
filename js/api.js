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

fetchMessages();
