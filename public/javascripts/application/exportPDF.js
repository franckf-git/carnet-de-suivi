const listEvaluations = []
const boxEvaluations = document.querySelectorAll('.accordion').forEach((evaluations) => {
  listEvaluations.push(evaluations.innerText)
})

const titreDuCarnet = document.querySelector('.title').innerHTML
const enseignant = document.querySelector('.pseudo').innerHTML
const dateDuJour = new Date()
dateDuJour.toLocaleString('fr-FR', {
  timeZone: 'Europe/Paris'
})
const jour = dateDuJour.getDate()
const mois = dateDuJour.getMonth() + 1
const annee = dateDuJour.getFullYear()

const logo = '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" id="svg8" version="1.1" viewBox="0 0 79.660568 8.3290834" height="8.3290834mm" width="79.660568mm" sodipodi:docname="logo.svg" inkscape:version="0.92.5 (2060ec1f9f, 2020-04-08)"> <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1920" inkscape:window-height="1047" id="namedview11" showgrid="false" inkscape:zoom="1.4580876" inkscape:cx="16.802832" inkscape:cy="15.74" inkscape:window-x="0" inkscape:window-y="33" inkscape:window-maximized="0" inkscape:current-layer="svg8" /> <defs id="defs2" /> <metadata id="metadata5"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> <dc:title /> </cc:Work> </rdf:RDF> </metadata> <g transform="translate(-64.255729,-31.621132)" id="layer1" style="stroke:none"> <text id="text3715" y="39.886715" x="63.610146" style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332" xml:space="preserve"><tspan style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-family:Comfortaa;-inkscape-font-specification:Comfortaa;stroke:none;stroke-width:0.26458332;stroke-opacity:1" y="39.886715" x="63.610146" id="tspan3713"><tspan id="tspan4530" style="fill:#b04027;fill-opacity:1;stroke:none">carnet</tspan> <tspan id="tspan4536" style="stroke:none">de</tspan> <tspan id="tspan4534" style="fill:#51c9e7;fill-opacity:1;stroke:none">suivi</tspan></tspan></text> </g></svg>'

pdfMake.fonts = {
  primary: {
    normal: 'Comfortaa-Regular.ttf',
    bold: 'Comfortaa-Regular.ttf',
    italics: 'Comfortaa-Regular.ttf',
    bolditalics: 'Comfortaa-Regular.ttf'
  },
  secondary: {
    normal: 'OpenSans-Regular.ttf',
    bold: 'OpenSans-Regular.ttf',
    italics: 'OpenSans-Regular.ttf',
    bolditalics: 'OpenSans-Regular.ttf'
  }
}

const docDefinition = {
  info: {
    title: `${titreDuCarnet}`,
    author: `${enseignant}`,
    subject: `${titreDuCarnet}`,
    keywords: `${titreDuCarnet}`,
    creator: `${enseignant}`,
    producer: 'carnet-de-suivi.net'
  },
  header: { svg: `${logo}`, margin: [10, 10] },
  footer: function (currentPage, pageCount) {
    return [{ text: `Page ${currentPage.toString()} sur ${pageCount}`, alignment: 'right', margin: [10, 10] }]
  },
  content: [
    {
      style: 'heroTitre',
      layout: 'noBorders',
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          [''],
          [''],
          [''],
          [''],
          [''],
          [`${titreDuCarnet}`],
          [`Classe de ${enseignant}`],
          [`Carnet à la date du ${jour} / ${mois} / ${annee}`],
          [''],
          [''],
          [''],
          [''],
          ['']
        ]
      }
    }

  ],
  styles: {
    heroTitre: {
      alignment: 'center', fillColor: '#dbdbdb'
    }
  },
  defaultStyle: {
    font: 'primary'
  }
}

listEvaluations.forEach(listEvaluation => docDefinition.content.push(`${listEvaluation}`))

const exportPdf = document.querySelector('.export-pdf')
exportPdf.addEventListener('click', () => {
  pdfMake.createPdf(docDefinition).open()
})
