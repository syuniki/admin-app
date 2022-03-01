import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @Input() member: Member;

  constructor(
    // URLのパラメータを取得するのに必要
    private route: ActivatedRoute,
    private memberService: MemberService,
    // ブラウザバックなどの機能をAngularを通して使う
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    // これでパスを取得できる (detail/:id)
    const id = +this.route.snapshot.paramMap.get('id'); // + はidを数値変換
    this.memberService.getMember(id)
      .subscribe(member => this.member = member);
  }

  goBack(): void {
    // ブラウザバックを実行
    this.location.back();
  }

  save(): void {
    this.memberService.updateMember(this.member)
      .subscribe(() => this.goBack());
  }

}
