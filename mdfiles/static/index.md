### 公開ファイル一覧  

何か有りましたら、御連絡ください。  

#### 最所研の紹介

<div id=replacePdfjs>閲覧したいファイルをクリックしてください．</div>

<!-- markdown-link-check-disable -->

<!-- - [Intro_Saisho-Lab2021.pdf](./index.html?FILE=../public_material/Intro_Saisho-Lab2021.pdf) -->
<!-- - [s20g470-AERG2020.pdf](./index.html?FILE=../public_material/s20g470-AERG2020.pdf) -->
<!-- - [s20g477-IntroResearch.pdf](./index.html?FILE=../public_material/s20g477-IntroResearch.pdf) -->
- [最所研究室紹介-2022](./index.html?FILE=../public_material/Intro_Saisho-Lab2022.pdf)
- [コンテナの隔離を強化するサンドボックス機構](./index.html?FILE=../public_material/s20g451_IntroResearch.pdf)
- [BEYOND:脆弱性対策のための​セキュリティ保護システム](./index.html?FILE=../public_material/s20g470-IntroResearch.pdf)
- [試行錯誤しながら自学自習できる体験型セキュリティ演習システム](./index.html?FILE=../public_material/s22d451-IntroResearch.pdf)

<script src='../pdfjs/build/pdf.js'> </script>
<script>
	function getFileNameFromGetFILE(){
		let url = new URL(window.location.href);
		let params=url.searchParams;
		return params.get('FILE');
	}
	
	const url=getFileNameFromGetFILE();
	pdfjsLib.GlobalWorkerOptions.workerSrc='../pdfjs/build/pdf.worker.js';
	const loadingTask=pdfjsLib.getDocument(url);
	
	(async ()=>{
		const pdf=await loadingTask.promise;
		const page=await pdf.getPage(1);
		const width=page._pageInfo.view[2];
		const height=page._pageInfo.view[3];
	
		let elmPdf=document.getElementById('replacePdfjs');
		elmPdf.innerHTML='<iframe src=\''+url+'\' height='+height+'px width='+width+'px ></iframe>';
	})();
</script>
