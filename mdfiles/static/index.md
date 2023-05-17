### 公開ファイル一覧  

何か有りましたら、御連絡ください。  

#### 最所研の紹介

<div id=replacePdfjs>閲覧したいファイルをクリックしてください．</div>

<!-- markdown-link-check-disable -->

<!-- - [Intro_Saisho-Lab2021.pdf](./index.html?FILE=../public_material/Intro_Saisho-Lab2021.pdf) -->
<!-- - [s20g470-AERG2020.pdf](./index.html?FILE=../public_material/s20g470-AERG2020.pdf) -->
<!-- - [s20g477-IntroResearch.pdf](./index.html?FILE=../public_material/s20g477-IntroResearch.pdf) -->
<!-- - [コンテナの隔離を強化するサンドボックス機構](./index.html?FILE=../public_material/s20g451_IntroResearch.pdf) -->
<!-- - [試行錯誤しながら自学自習できる体験型セキュリティ演習システム](./index.html?FILE=../public_material/s22d451-IntroResearch.pdf) -->
<!-- - [BEYOND:脆弱性対策のための​セキュリティ保護システム](./index.html?FILE=../public_material/s20g470-IntroResearch.pdf) -->

- [最所研究室紹介-2022](./index.html?FILE=../public_material/Intro_Saisho-Lab2022.pdf)
- [Yuiha ~バージョン管理機能を持つファイルシステム(VerFS)~](./index.html?FILE=../public_material/poster-2022_VersionFileSystem.pdf)
- [セキュリティ演習システム](./index.html?FILE=../public_material/poster-2022_CyberEducation.pdf)
- [セキュリティ演習システム(Long Version)](./index.html?FILE=../public_material/s22d451-IntroResearch.pdf)
- [Security Exercise System](./index.html?FILE=../public_material/Security_Exercise_System.pdf)
- [BEYOND: セキュリティ対策システム](./index.html?FILE=../public_material/poster-2022_BEYOND-SecuritySystem.pdf)
- [BEYOND: セキュリティ対策システム(Long Version)](./index.html?FILE=../public_material/s20g470-IntroResearch.pdf)
- [分散WebシステムとDNSキャッシュポイズニングの可視化 ](./index.html?FILE=../public_material/poster-2022_Loadbalance-Visualization.pdf)

#### 2022年度勉強会

- [vagrantとansible](./index.html?FILE=../public_material/vagrant_ansible.pdf)
- [論文の書き方](./index.html?FILE=../public_material/howtowrite.pdf)
- [コンテナ，Docker](https://yuyuyusei.github.io/container-learn/)
- [Tex(テフ)の使い方](https://hackmd.io/vNPoCzvzSzO43ccTsQha3A?view)

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
