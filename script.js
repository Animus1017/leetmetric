document.addEventListener('DOMContentLoaded',function(){
    const btn=document.querySelector('button');
    const input=document.querySelector('#search');
    const stats=document.querySelector('.stats');
    const easyProgress=document.querySelector('.easy-progress');
    const medProgress=document.querySelector('.medium-progress');
    const hardProgress=document.querySelector('.hard-progress');
    const easy=document.querySelector('#easy');
    const med=document.querySelector('#medium');
    const hard=document.querySelector('#hard');
    const solvedTotal=document.querySelector('#total');
    const rate=document.querySelector('#rate');
    const ranking=document.querySelector('#ranking');
    const points=document.querySelector('#points');

    function validate(username){
        if(username.trim()===''){
            alert("Username should not be empty");
            return false;
        }
        const regex=/^[a-zA-Z][a-zA-Z0-9_]{0,14}$/;
        const match=regex.test(username);
        if(!match)
        alert("Username nor valid.");
        return match;
    }
    function updatepie(total,solved,label,circle){
        const progressDeg=(solved/total)*100;
        circle.style.setProperty("--progress-deg",`${progressDeg}%`);
        label.textContent=`${solved} / ${total}`;
    }
    function updatecard(content,label){
        label.textContent=content;
    }
    function display(response){
        const total=response.totalQuestions;
        const totalEasy=response.totalEasy;
        const totalMed=response.totalMedium;
        const totalHard=response.totalHard;
        const solved=response.totalSolved;
        const solvedEasy=response.easySolved;
        const solvedMed=response.mediumSolved;
        const solvedHard=response.hardSolved;
        const leetrate=response.acceptanceRate;
        const leetrank=response.ranking;
        const leetpoints=response.contributionPoints;
        updatepie(totalEasy,solvedEasy,easy,easyProgress);
        updatepie(totalMed,solvedMed,med,medProgress);
        updatepie(totalHard,solvedHard,hard,hardProgress);
        updatecard(`${solved} / ${total}`,solvedTotal);
        updatecard(leetrate,rate);
        updatecard(leetrank,ranking);
        updatecard(leetpoints,points);

    }
    async function fetchUser(username) {
        try{
            btn.textContent='Searching...';
            btn.disabled=true;
            const url=`https://leetcode-stats-api.herokuapp.com/${username}`;
            const response=await fetch(url);
            if(!response.ok)
                throw new Error("Unable to fetch data");
            const data=await response.json();
            stats.style.visibility='visible';
            display(data);            
        }
        catch(error){
            stats.innerHTML="<p>No data found</p>";
        }
        finally{
            btn.textContent='Search';
            btn.disabled=false;
        }
    }

    btn.addEventListener('click',()=>{
        stats.style.visibility='hidden';
        const username=input.value;
        if(validate(username)){
            fetchUser(username);            
        }
    });
});