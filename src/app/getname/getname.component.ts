import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getname',
  templateUrl: './getname.component.html',
  styleUrls: ['./getname.component.less']
})
export class GetnameComponent implements OnInit {


//   greatNum = [
//     1, 3 ,5 ,6, 7, 8, 11, 13 ,15 ,16, 17 ,18, 21, 23, 24, 25,
//  30, 31 ,32 ,33 ,35 ,37 ,39 ,41 ,45, 47 ,48, 52
//   ];
  greatNum = [
    1,3,5,7,8,11,13,15,16,18,21,23,24,25,31,32,33,35,37,39,41,45,47,48,
    //52,57,61,63,65,67,68,81
  ];
  

  greatA = [
    3 ,5 ,6, 7, 8, 11, 13 ,15 , 21, 23, 25
  ];
  greatB = [
    6, 7,15 ,16, 17 , 23, 24
  ];
  scList = [
    '木木木','木木火','木木土','木火木','木火土','木水木','木水金','木水水'
  ]
  a = 1;
  b = 1;

  rel: {
    '第一个字': number,
    '第二个字': number
  }
  relList: Array<any>;

  tian = 11;
  di: number; // = this.a+this.b;
  ren: number; // = 10 + this.a;
  zong: number; // = 10+this.a+this.b;
  wai: number; // = 1+this.b;

  index = 1;


  constructor() { }

  ngOnInit() {
    this.calculate();
  }

  calculate(){
    for(let j=1; j<=25; j++){
      for(let k = 1; k<=25; k++){
        this.a = j;
        this.b=k;
        if(this.a<3||this.b<3) continue;
        this.di= this.a+this.b;
        this.ren = 10 + this.a;
        this.zong = 10+this.a+this.b;
        this.wai = 1+this.b;
        const sc = this.sancai(this.tian)+this.sancai(this.ren)+ this.sancai(this.di);
        // console.log(this.index++,this.a,this.b);
        if(
          this.greatNum.includes(this.di)
          && this.greatNum.includes(this.ren)
          && this.greatNum.includes(this.zong)
          && this.greatNum.includes(this.wai)
          && this.scList.includes(sc)
        ){
          console.log(this.index++, 
            '中间字:', this.a, 
            '最后字:', this.b, 
            '天:', this.tian,
            '地:',this.di,
            '人:',this.ren,
            '总:', this.zong,
            '外:',this.wai,
            '三才:',sc
        //  '三才:',this.sancai(this.tian), this.sancai(this.ren), this.sancai(this.di)
         );
        }
        // console.log(
        //   this.index, 
        //   'a:', this.a, 
        //   'b:', this.b, 
        //   'di:', this.di, this.greatNum.includes(this.di),
        //   'ren:', this.ren, this.greatNum.includes(this.ren),
        //   'zong:', this.zong, this.greatNum.includes(this.zong),
        //   'wai:', this.wai, this.greatNum.includes(this.wai),
        //   )
      }
    }
  }


  sancai(num: number) {
    const a = num % 10;
    switch(a){
      case 1:
        case 2: return '木';
        case 3:
          case 4: return '火';
          case 5:
            case 6: return '土';
            case 7:
              case 8: return '金';
              case 9:
                case 0: return '水';
    }
  }
}







// 大吉
// 13 "a:" 11 "b:" 24 "三才:" "木" "木" "土"




// 中吉
// 3 "a:" 6 "b:" 7 "三才:" "木" "土" "火"
// 5 "a:" 6 "b:" 17 "三才:" "木" "土" "火"






// 凶
// 6 "a:" 7 "b:" 6 "三才:" "木" "金" "火"
// 7 "a:" 7 "b:" 16 "三才:" "木" "金" "火"
// 9 "a:" 8 "b:" 7 "三才:" "木" "金" "土"
// 10 "a:" 8 "b:" 15 "三才:" "木" "金" "火"
// 11 "a:" 8 "b:" 17 "三才:" "木" "金" "土"
// 12 "a:" 8 "b:" 23 "三才:" "木" "金" "木"
// 8 "a:" 7 "b:" 24 "三才:" "木" "金" "木"
// 15 "a:" 15 "b:" 6 "三才:" "木" "土" "木"
// 16 "a:" 15 "b:" 16 "三才:" "木" "土" "木"
// 18 "a:" 25 "b:" 6 "三才:" "木" "土" "木"
// 4 "a:" 6 "b:" 15 "三才:" "木" "土" "木"
// 1 "a:" 5 "b:" 6 "三才:" "木" "土" "木"
// 2 "a:" 5 "b:" 16 "三才:" "木" "土" "木"
// 14 "a:" 13 "b:" 24 "三才:" "木" "火" "金"
// 17 "a:" 21 "b:" 16 "三才:" "木" "木" "金"