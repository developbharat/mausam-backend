import { MigrationInterface, QueryRunner } from "typeorm";

export class initialStatesData1642008984771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO states (id, name, aws_code) VALUES
              ('1', 'ANDAMAN_AND_NICOBAR', 'ANDAMAN_AND_NICOBAR'),
              ('2', 'ANDHRA_PRADESH', 'ANDHRA_PRADESH'),
              ('3', 'ARUNACHAL_PRADESH', 'ARUNACHAL_PRADESH'),
              ('4', 'ASSAM', 'ASSAM'),
              ('5', 'BANGLADESH', 'BANGLADESH'),
              ('6', 'BHUTAN', 'BHUTAN'),
              ('7', 'BIHAR', 'BIHAR'),
              ('8', 'CHANDIGARH', 'CHANDIGARH'),
              ('9', 'CHHATTISGARH', 'CHHATTISGARH'),
              ('10', 'DAMAN_AND_DIU', 'DAMAN_AND_DIU'),
              ('11', 'DELHI', 'DELHI'),
              ('12', 'GOA', 'GOA'),
              ('13', 'GUJARAT', 'GUJARAT'),
              ('14', 'HARYANA', 'HARYANA'),
              ('15', 'HIMACHAL_PRADESH', 'HIMACHAL_PRADESH'),
              ('16', 'JAMMU_AND_KASHMIR', 'JAMMU_AND_KASHMIR'),
              ('17', 'JHARKHAND', 'JHARKHAND'),
              ('18', 'KARNATAKA', 'KARNATAKA'),
              ('19', 'KERALA', 'KERALA'),
              ('20', 'LADAKH', 'LADAKH'),
              ('21', 'LAKSHADWEEP', 'LAKSHADWEEP'),
              ('22', 'MADHYA_PRADESH', 'MADHYA_PRADESH'),
              ('23', 'MAHARASHTRA', 'MAHARASHTRA'),
              ('24', 'MANIPUR', 'MANIPUR'),
              ('25', 'MEGHALAYA', 'MEGHALAYA'),
              ('26', 'MIZORAM', 'MIZORAM'),
              ('27', 'NAGALAND', 'NAGALAND'),
              ('28', 'NEPAL', 'NEPAL'),
              ('29', 'ODISHA', 'ODISHA'),
              ('30', 'PUDUCHERRY', 'PUDUCHERRY'),
              ('31', 'PUNJAB', 'PUNJAB'),
              ('32', 'RAJASTHAN', 'RAJASTHAN'),
              ('33', 'RAJASTHAN_RAILWAY', 'RAJASTHAN_RAILWAY'),
              ('34', 'SIKKIM', 'SIKKIM'),
              ('35', 'TAMIL_NADU', 'TAMIL_NADU'),
              ('36', 'TELANGANA', 'TELANGANA'),
              ('37', 'TRIPURA', 'TRIPURA'),
              ('38', 'UTTARAKHAND', 'UTTARAKHAND'),
              ('39', 'UTTAR_PRADESH', 'UTTAR_PRADESH'),
              ('40', 'WEST_BENGAL', 'WEST_BENGAL')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM states WHERE "id" >= 1 AND "id" <= 40;`);
  }
}
