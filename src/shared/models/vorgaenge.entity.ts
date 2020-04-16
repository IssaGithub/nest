import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ViewColumn,
  ViewEntity,
} from 'typeorm';

@ViewEntity({
  expression: `
      SELECT "V_SI_JIRA_Issues_SP"."Nummer" as "Nummer", "V_SI_JIRA_Issues_SP"."Zusammenfassung" AS "Zusammenfassung", "V_SI_JIRA_Issues_SP"."Status" AS "Status"
      ,"V_SI_JIRA_Issues_SP"."Vorgangstyp" AS "Vorgangstyp" ,"V_SI_JIRA_Issues_SP"."Bearbeiter" AS "Bearbeiter","V_SI_JIRA_Issues_SP"."Beobachter" AS "Beobachter",
      "V_SI_JIRA_Issues_SP"."Beobachter_Mailadressen" AS "Beobachter_Mailadressen",
      "V_SI_JIRA_Issues_SP"."Aktualisiert" AS "Aktualisiert","V_SI_JIRA_Issues_SP"."Testsysteme" AS "Testsysteme","V_SI_JIRA_Issues_SP"."Frontend_Elemente" AS "Frontend_Elemente",
      "V_SI_JIRA_Issues_SP"."Frontend_Elemente_vorbereitet" AS "Frontend_Elemente_vorbereitet",
      "V_SI_JIRA_Issues_SP"."Datenbank_Elemente" AS "Datenbank_Elemente",   "V_SI_JIRA_Issues_SP"."Sprint_Name_aktiv" AS "Sprint_Name_aktiv",
      "V_SI_JIRA_Issues_SP"."Version_Name" AS "Version_Name", "V_SI_JIRA_Issues_SP"."Version_ReleaseDate" AS "Version_ReleaseDate"
      FROM 'V_SI_JIRA_Issues_SP'    
  `,
})
export class V_SI_JIRAIssues_SP {
  @ViewColumn()
  Nummer: string;
  @ViewColumn()
  Zusammenfassung: string;

  @ViewColumn()
  Status: string;

  @ViewColumn()
  Vorgangstyp: string;

  @ViewColumn()
  Bearbeiter: string;
  @ViewColumn()
  Beobachter: string;
  @ViewColumn()
  Beobachter_Mailadressen: string;
  @ViewColumn()
  Aktualisiert: Date;
  @ViewColumn()
  Testsysteme: string;
  @ViewColumn()
  Frontend_Elemente: string;
  @ViewColumn()
  Frontend_Elemente_vorbereitet: string;
  @ViewColumn()
  Datenbank_Elemente: string;
  @ViewColumn()
  Sprint_Name_aktiv: string;
  @ViewColumn()
  Version_Name: string;
  @ViewColumn()
  Version_ReleaseDate: Date;
}
