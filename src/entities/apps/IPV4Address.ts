import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { range } from "../../utils/range";

@ObjectType()
@Entity("ipv4_addresses")
export class IPV4Address {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column()
  octet_one_from: number;

  @Column()
  octet_one_to: number;

  @Column()
  octet_two_from: number;

  @Column()
  octet_two_to: number;

  @Column()
  octet_three_from: number;

  @Column()
  octet_three_to: number;

  @Column()
  octet_four_from: number;

  @Column()
  octet_four_to: number;

  @Field()
  @Column({ default: false })
  is_whitelisted?: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Field()
  public get ip(): string {
    const first = this.octet_one_to !== this.octet_one_from ? `-${this.octet_one_to}` : "";
    const second = this.octet_two_to !== this.octet_two_from ? `-${this.octet_two_to}` : "";
    const third = this.octet_three_to !== this.octet_three_from ? `-${this.octet_three_to}` : "";
    const fourth = this.octet_four_to !== this.octet_four_from ? `-${this.octet_four_to}` : "";
    return `${this.octet_one_from}${first}.${this.octet_two_from}${second}.${this.octet_three_from}${third}.${this.octet_four_from}${fourth}`;
  }

  /**
   * Returns a list of ip addresses converted from range to individual ips.
   * @returns {string[]} A list of ip addresses
   */
  public ips(): string[] {
    const octet1 = range(this.octet_one_from, this.octet_one_to);
    const octet2 = range(this.octet_two_from, this.octet_two_to);
    const octet3 = range(this.octet_three_from, this.octet_three_to);
    const octet4 = range(this.octet_four_from, this.octet_four_to);

    const ips = [];
    for (let item1 of octet1) {
      for (let item2 of octet2) {
        for (let item3 of octet3) {
          for (let item4 of octet4) {
            const ip = `${item1}.${item2}.${item3}.${item4}`;
            ips.push(ip);
          }
        }
      }
    }

    return ips;
  }
}
