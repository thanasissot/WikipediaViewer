// "https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchTerm+"&format=json&callback=?"
// `http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=${searchTerm}&gsrlimit=10&prop=info%7Cdescription&inprop=url&origin=*`
// `/w/api.php?action=query&format=json&origin=*&prop=info%7Cextracts&generator=search&inprop=url&exsentences=2&exlimit=10&exintro=1&explaintext=1&gsrsearch=${searchTerm}&gsrprop=snippet`
// `/w/api.php?action=query&format=json&origin=*&prop=revisions&list=search&rvprop=content%7Cids&srsearch=${searchTerm}`
let pages = document.querySelector('#pages');
let data;
function wikiSearch () {
  let searchEl = document.querySelector('#searchTerm')
  let searchTerm = searchEl.value
  let url = `http://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=info%7Cextracts&generator=search&inprop=url&exchars=300&exlimit=10&exintro=1&explaintext=1&gsrsearch=${searchTerm}&gsrprop=snippet`

  let xml = new XMLHttpRequest();
  xml.responseType = 'text';
  xml.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.response);
      data = data.query.pages;
      console.log(data);
      for (x in data) {
        let anchor = document.createElement('a');
        anchor.setAttribute('href', data[x].fullurl);
        let para = document.createElement('p');
        para.className = 'para';
        let title = document.createElement('h4');
        title.textContent = data[x].title;
        let textNode =  document.createTextNode(data[x].extract);
        para.appendChild(title);
        para.appendChild(textNode);
        anchor.appendChild(para);
        pages.appendChild(anchor);
      };
    }
  }
  xml.open('GET', url, true);
  xml.send();
}

let button = document.querySelector('#button');
button.addEventListener('click', wikiSearch);
