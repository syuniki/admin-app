import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];

  constructor(
    private memberService: MemberService,
  ) { }

  // コンポーネントが初期化されるときに呼び出される(外部からデータを取得する際には、ここから行うのがよい)
  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.getMembers() // Observableが返ってくる
      .subscribe(members => this.members = members);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return ; }
    this.memberService.addMember({name} as Member)
      .subscribe(member => {
        this.members.push(member);
      });
  }

  delete(member: Member): void {
    this.members = this.members.filter(m => m !== member);
    this.memberService.deleteMember(member).subscribe();
  }

}
