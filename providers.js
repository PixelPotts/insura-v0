export default {
  providers: [

    // MUTUAL OF OMAHA
    {
      id: 1,
      name: "Mutual of Omaha",
      nickname: "M",
      logoUrl: './images/logo_moo.jpg',
      products: [
        {
          id: 100,
          name: "Term Life Express, 18-50",
          nickname: "TLE50",
          payout: {
            min: 25000,
            max: 300000
          },
          underwriting: {
            age: {
              min: 18,
              max: 50
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [
                {
                  "name": "Abacavir"
                },
                {
                  "name": "Abilify"
                },
                {
                  "name": "Adcirca"
                },
                {
                  "name": "Aggrenox"
                },
                {
                  "name": "Alkeran"
                },
                {
                  "name": "Amiodarone"
                },
                {
                  "name": "Ampyra"
                },
                {
                  "name": "Antabuse"
                },
                {
                  "name": "Aricept"
                },
                {
                  "name": "Arimidex"
                },
                {
                  "name": "Atripla"
                },
                {
                  "name": "Avonex"
                },
                {
                  "name": "Azilect"
                },
                {
                  "name": "Baraclude"
                },
                {
                  "name": "Betaseron"
                },
                {
                  "name": "Calcium Acetate"
                },
                {
                  "name": "Campath"
                },
                {
                  "name": "Campral"
                },
                {
                  "name": "Caprelsa"
                },
                {
                  "name": "Carbidopa"
                },
                {
                  "name": "Levodopa"
                },
                {
                  "name": "Casodex"
                },
                {
                  "name": "Cellcept"
                },
                {
                  "name": "Chlorpromazine Hydrochloride"
                },
                {
                  "name": "Clozapine"
                },
                {
                  "name": "Cognex"
                },
                {
                  "name": "Combivir"
                },
                {
                  "name": "Copaxone"
                },
                {
                  "name": "Crixivan"
                },
                {
                  "name": "Cyclosporine"
                },
                {
                  "name": "Cytoxan"
                },
                {
                  "name": "Digitek"
                },
                {
                  "name": "DIGOXIN (DIGITEK)"
                },
                {
                  "name": "Dobutamine Hydrochloride"
                },
                {
                  "name": "Donepezil"
                },
                {
                  "name": "Droxia"
                },
                {
                  "name": "Eligard"
                },
                {
                  "name": "Eliquis"
                },
                {
                  "name": "Eminase"
                },
                {
                  "name": "Enbrel"
                },
                {
                  "name": "Epivir-Hbv"
                },
                {
                  "name": "Ergoloid Mesylates"
                },
                {
                  "name": "Exelon"
                },
                {
                  "name": "Femara"
                },
                {
                  "name": "Floxuridine"
                },
                {
                  "name": "Fluorouracil"
                },
                {
                  "name": "Galantamine"
                },
                {
                  "name": "Hydrobromide"
                },
                {
                  "name": "Gammagard"
                },
                {
                  "name": "Gamunex"
                },
                {
                  "name": "Gengraf"
                },
                {
                  "name": "Geodon"
                },
                {
                  "name": "Haldol"
                },
                {
                  "name": "Haloperidol"
                },
                {
                  "name": "Hepsera"
                },
                {
                  "name": "Humira"
                },
                {
                  "name": "Hydrea"
                },
                {
                  "name": "Hydroxyurea"
                },
                {
                  "name": "Infergen"
                },
                {
                  "name": "Invega"
                },
                {
                  "name": "Invirase"
                },
                {
                  "name": "Kalydeco"
                },
                {
                  "name": "Lanoxin"
                },
                {
                  "name": "Latuda"
                },
                {
                  "name": "Leucovorin Calcium"
                },
                {
                  "name": "Lexiva"
                },
                {
                  "name": "Limbitrol"
                },
                {
                  "name": "Lithium"
                },
                {
                  "name": "Megestrol Acetate"
                },
                {
                  "name": "Methadone"
                },
                {
                  "name": "Methotrexate"
                },
                {
                  "name": "Mitomycin"
                },
                {
                  "name": "Morphine Sulfate"
                },
                {
                  "name": "Mycophenolate Mofetil"
                },
                {
                  "name": "Myfortic"
                },
                {
                  "name": "Nabi-Hb"
                },
                {
                  "name": "Naloxone Hcl"
                },
                {
                  "name": "Naltrexone Hydrochloride"
                },
                {
                  "name": "Namenda"
                },
                {
                  "name": "Neupogen"
                },
                {
                  "name": "Panretin"
                },
                {
                  "name": "Pegasys"
                },
                {
                  "name": "Peg-Intron"
                },
                {
                  "name": "Perphenazine"
                },
                {
                  "name": "Pradaxa"
                },
                {
                  "name": "Prograf"
                },
                {
                  "name": "Ranexa"
                },
                {
                  "name": "Razadyne"
                },
                {
                  "name": "Rebif"
                },
                {
                  "name": "Retrovir"
                },
                {
                  "name": "Revia"
                },
                {
                  "name": "Revlimid"
                },
                {
                  "name": "Ribavirin"
                },
                {
                  "name": "Risperdal"
                },
                {
                  "name": "Rituxan"
                },
                {
                  "name": "Sandimmune"
                },
                {
                  "name": "Saphris"
                },
                {
                  "name": "Seroquel"
                },
                {
                  "name": "Serzone"
                },
                {
                  "name": "Sinemet"
                },
                {
                  "name": "Spiriva"
                },
                {
                  "name": "Stalevo"
                },
                {
                  "name": "Stribild"
                },
                {
                  "name": "Suboxone"
                },
                {
                  "name": "Sustiva"
                },
                {
                  "name": "Symbyax"
                },
                {
                  "name": "Tamoxifen"
                },
                {
                  "name": "Targretin"
                },
                {
                  "name": "Teslac"
                },
                {
                  "name": "Truvada"
                },
                {
                  "name": "Tysabri"
                },
                {
                  "name": "Viracept"
                },
                {
                  "name": "Viramune"
                },
                {
                  "name": "Viread"
                },
                {
                  "name": "Xarelto"
                },
                {
                  "name": "Xeljanz"
                },
                {
                  "name": "Zenapax"
                },
                {
                  "name": "Zerit"
                },
                {
                  "name": "Ziagen"
                },
                {
                  "name": "Zidovudine"
                },
                {
                  "name": "Zoladex"
                },
                {
                  "name": "Zyprexa"
                }
              ],
              info: [
                {
                  "name": "Carvedilol"
                },
                {
                  "name": "Clopidogrel"
                },
                {
                  "name": "Coreg"
                },
                {
                  "name": "Coumadin"
                },
                {
                  "name": "Enoxaparin Sodium"
                },
                {
                  "name": "Lovenox"
                },
                {
                  "name": "Plavix"
                },
                {
                  "name": "Warfarin"
                }
              ],
              seeDecline: false
            },
            conditions: {
              decline: [
                {
                  name: 'SHR028', // Diabetes
                  maxAge: 50
                },
                {
                  name: 'BPL003',
                  maxAge: 999
                },
                {
                  name: 'GST055',
                  maxAge: 999
                }
                ,
                {
                  name: 'CNG053001',
                  maxAge: 999
                }
              ],
              seeDecline: false,
              info: [
                {
                  name: 'Diabetes', // Diabetes
                  key: 'DBT085',
                  maxAge: 1
                },
              ],
            }
          }
        },
        {
          id: 101,
          name: "Term Life Express, 51-65",
          nickname: "TLE65",
          payout: {
            min: 25000,
            max: 250000
          },
          underwriting: {
            age: {
              min: 51,
              max: 65
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: 100
            },
            conditions: {
              decline: [
                {
                  name: 'BPL003',
                  maxAge: 999
                },
                {
                  name: 'GST055',
                  maxAge: 999
                }
                ,
                {
                  name: 'CNG053001',
                  maxAge: 999
                }
              ],
              info: [
                {
                  name: 'Diabetes', // Diabetes
                  key: 'DBT085',
                  maxAge: 999
                },
              ],
              seeDecline: false
            }
          }
        },
        {
          id: 110,
          name: "GUL Express, 18-50",
          nickname: "GULE50",
          payout: {
            min: 25000,
            max: 300000
          },
          underwriting: {
            age: {
              min: 18,
              max: 50
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: 100
            },
            conditions: {
              decline: ['DBT085'],
              seeDecline: false,
              info: [
                {
                  name: 'Diabetes', // Diabetes
                  key: 'DBT085',
                  maxAge: 1
                },
              ],
            }
          }
        },
        {
          id: 111,
          name: "GUL Express 51-65",
          nickname: "GULE65",
          payout: {
            min: 25000,
            max: 250000
          },
          underwriting: {
            age: {
              min: 51,
              max: 65
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: 100
            },
            conditions: {
              decline: [
                'CNG053001',
                'BPL003'
              ],
              info: [
                {
                  name: 'Diabetes', // Diabetes
                  key: 'DBT085',
                  maxAge: 999
                },
              ],
              seeDecline: false
            }
          }
        },
        {
          id: 120,
          name: "Living Promise Level Benefit",
          nickname: "LPLB",
          payout: {
            min: 2000,
            max: 40000
          },
          underwriting: {
            age: {
              min: 45,
              max: 85
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [
                {
                  "name": "Abacavir"
                },
                {
                  "name": "Abilify*"
                },
                {
                  "name": "Alkeran"
                },
                {
                  "name": "Amiodarone*"
                },
                {
                  "name": "Ampyra*"
                },
                {
                  "name": "Antabuse*"
                },
                {
                  "name": "Aricept"
                },
                {
                  "name": "Atripla"
                },
                {
                  "name": "Avonex*"
                },
                {
                  "name": "Azilect*"
                },
                {
                  "name": "Baraclude*"
                },
                {
                  "name": "Betaseron*"
                },
                {
                  "name": "Calcium Acetate*"
                },
                {
                  "name": "Campath"
                },
                {
                  "name": "Campral*"
                },
                {
                  "name": "Caprelsa"
                },
                {
                  "name": "Carbidopa/Levodopa*"
                },
                {
                  "name": "Casodex"
                },
                {
                  "name": "Cellcept"
                },
                {
                  "name": "Chlorpromazine Hcl*"
                },
                {
                  "name": "Clozapine*"
                },
                {
                  "name": "Cognex"
                },
                {
                  "name": "Combivir"
                },
                {
                  "name": "Copaxone*"
                },
                {
                  "name": "Crixivan"
                },
                {
                  "name": "Cyclosporine"
                },
                {
                  "name": "Cytoxan"
                },
                {
                  "name": "Donepezil"
                },
                {
                  "name": "Droxia"
                },
                {
                  "name": "Eligard"
                },
                {
                  "name": "Eminase*"
                },
                {
                  "name": "Epivir Hbv"
                },
                {
                  "name": "Ergoloid Mesylates"
                },
                {
                  "name": "Exelon"
                },
                {
                  "name": "Floxuridine"
                },
                {
                  "name": "Fluorouracil"
                },
                {
                  "name": "Galantamine"
                },
                {
                  "name": "Hydrobromide"
                },
                {
                  "name": "Gammagard"
                },
                {
                  "name": "Gamunex"
                },
                {
                  "name": "Gengraf"
                },
                {
                  "name": "Geodon*"
                },
                {
                  "name": "Haldol*"
                },
                {
                  "name": "Haloperidol*"
                },
                {
                  "name": "Hydrea"
                },
                {
                  "name": "Hydroxyurea"
                },
                {
                  "name": "Infergen*"
                },
                {
                  "name": "Invega*"
                },
                {
                  "name": "Invirase"
                },
                {
                  "name": "Latuda*"
                },
                {
                  "name": "Leucovorin Calcium"
                },
                {
                  "name": "Lexiva"
                },
                {
                  "name": "Limbitrol*"
                },
                {
                  "name": "Lithium*"
                },
                {
                  "name": "Megace"
                },
                {
                  "name": "Megestrol Acetate"
                },
                {
                  "name": "Mitomycin"
                },
                {
                  "name": "Mycophenolate Mofetil"
                },
                {
                  "name": "Myfortic"
                },
                {
                  "name": "Naloxone Hcl*"
                },
                {
                  "name": "Naltrexone Hcl*"
                },
                {
                  "name": "Namenda"
                },
                {
                  "name": "Neupogen"
                },
                {
                  "name": "Panretin"
                },
                {
                  "name": "Pegasys*"
                },
                {
                  "name": "Peg-Intron*"
                },
                {
                  "name": "Perphenazine*"
                },
                {
                  "name": "Pradaxa*"
                },
                {
                  "name": "Prograf"
                },
                {
                  "name": "Ranexa*"
                },
                {
                  "name": "Razadyne"
                },
                {
                  "name": "Rebif*"
                },
                {
                  "name": "Retrovir"
                },
                {
                  "name": "Revia*"
                },
                {
                  "name": "Revlimid"
                },
                {
                  "name": "Ribavirin*"
                },
                {
                  "name": "Risperdal*"
                },
                {
                  "name": "Rituxan"
                },
                {
                  "name": "Sandimmune"
                },
                {
                  "name": "Saphris*"
                },
                {
                  "name": "Seroquel*"
                },
                {
                  "name": "Serzone*"
                },
                {
                  "name": "Sinemet*"
                },
                {
                  "name": "Spiriva*"
                },
                {
                  "name": "Stalevo*"
                },
                {
                  "name": "Stribild"
                },
                {
                  "name": "Suboxone*"
                },
                {
                  "name": "Sustiva"
                },
                {
                  "name": "Symbyax*"
                },
                {
                  "name": "Targretin"
                },
                {
                  "name": "Teslac"
                },
                {
                  "name": "Truvada"
                },
                {
                  "name": "Viracept"
                },
                {
                  "name": "Viramune"
                },
                {
                  "name": "Viread"
                },
                {
                  "name": "Zenapax"
                },
                {
                  "name": "Zerit"
                },
                {
                  "name": "Ziagen"
                },
                {
                  "name": "Zidovudine"
                },
                {
                  "name": "Zoladex"
                },
                {
                  "name": "Zyprexa*"
                }
              ],
              info: [
                {
                  "name": "Aggrenox"
                },
                {
                  "name": "Arimidex"
                },
                {
                  "name": "Carvedilol"
                },
                {
                  "name": "Clopidogrel"
                },
                {
                  "name": "Coreg"
                },
                {
                  "name": "Coumadin"
                },
                {
                  "name": "Digitek"
                },
                {
                  "name": "DIGOXIN (DIGITEK)"
                },
                {
                  "name": "Eliquis"
                },
                {
                  "name": "Enoxaparin Sodium"
                },
                {
                  "name": "Femara"
                },
                {
                  "name": "Lanoxin"
                },
                {
                  "name": "Lovenox"
                },
                {
                  "name": "Plavix"
                },
                {
                  "name": "Tamoxifen"
                },
                {
                  "name": "Warfarin"
                },
                {
                  "name": "Xarelto"
                }
              ]
            },
            conditions: {
              decline: [
                'CNG053001',
                'BPL003'
              ],
              seeDecline: false
            }
          }
        },
        {
          id: 130,
          name: "Living Promise Graded Benefit",
          nickname: "LPGB",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [

                {
                  "name": "Abacavir"
                },
                {
                  "name": "Alkeran"
                },
                {
                  "name": "Aricept"
                },
                {
                  "name": "Atripla"
                },
                {
                  "name": "Calcium Acetate*"
                },
                {
                  "name": "Campath"
                },
                {
                  "name": "Caprelsa"
                },
                {
                  "name": "Carbidopa/Levodopa*"
                },
                {
                  "name": "Casodex"
                },
                {
                  "name": "Cellcept"
                },
                {
                  "name": "Chlorpromazine Hcl*"
                },
                {
                  "name": "Cognex"
                },
                {
                  "name": "Combivir"
                },
                {
                  "name": "Crixivan"
                },
                {
                  "name": "Cyclosporine"
                },
                {
                  "name": "Cytoxan"
                },
                {
                  "name": "Donepezil"
                },
                {
                  "name": "Droxia"
                },
                {
                  "name": "Eligard"
                },
                {
                  "name": "Epivir Hbv"
                },
                {
                  "name": "Ergoloid Mesylates"
                },
                {
                  "name": "Exelon"
                },
                {
                  "name": "Floxuridine"
                },
                {
                  "name": "Fluorouracil"
                },
                {
                  "name": "Galantamine"
                },
                {
                  "name": "Hydrobromide"
                },
                {
                  "name": "Gammagard"
                },
                {
                  "name": "Gamunex"
                },
                {
                  "name": "Gengraf"
                },
                {
                  "name": "Hydrea"
                },
                {
                  "name": "Hydroxyurea"
                },
                {
                  "name": "Invirase"
                },
                {
                  "name": "Leucovorin Calcium"
                },
                {
                  "name": "Lexiva"
                },
                {
                  "name": "Megace"
                },
                {
                  "name": "Megestrol Acetate"
                },
                {
                  "name": "Mitomycin"
                },
                {
                  "name": "Mycophenolate Mofetil"
                },
                {
                  "name": "Myfortic"
                },
                {
                  "name": "Naloxone Hcl*"
                },
                {
                  "name": "Naltrexone Hcl*"
                },
                {
                  "name": "Namenda"
                },
                {
                  "name": "Neupogen"
                },
                {
                  "name": "Panretin"
                },
                {
                  "name": "Peg-Intron*"
                },
                {
                  "name": "Prograf"
                },
                {
                  "name": "Razadyne"
                },
                {
                  "name": "Retrovir"
                },
                {
                  "name": "Revlimid"
                },
                {
                  "name": "Rituxan"
                },
                {
                  "name": "Sandimmune"
                },
                {
                  "name": "Stribild"
                },
                {
                  "name": "Sustiva"
                },
                {
                  "name": "Targretin"
                },
                {
                  "name": "Teslac"
                },
                {
                  "name": "Truvada"
                },
                {
                  "name": "Viracept"
                },
                {
                  "name": "Viramune"
                },
                {
                  "name": "Viread"
                },
                {
                  "name": "Zenapax"
                },
                {
                  "name": "Zerit"
                },
                {
                  "name": "Ziagen"
                },
                {
                  "name": "Zidovudine"
                },
                {
                  "name": "Zoladex"
                },
                {
                  "name": "Zyprexa*"
                }
              ],
              info: [

                {
                  "name": "Abilify*"
                },
                {
                  "name": "Amiodarone*"
                },
                {
                  "name": "Ampyra*"
                },
                {
                  "name": "Antabuse*"
                },
                {
                  "name": "Avonex*"
                },
                {
                  "name": "Azilect*"
                },
                {
                  "name": "Baraclude*"
                },
                {
                  "name": "Betaseron*"
                },
                {
                  "name": "Calcium Acetate*"
                },
                {
                  "name": "Campral*"
                },
                {
                  "name": "Carbidopa/Levodopa*"
                },
                {
                  "name": "Chlorpromazine Hcl*"
                },
                {
                  "name": "Clozapine*"
                },
                {
                  "name": "Copaxone*"
                },
                {
                  "name": "Eminase*"
                },
                {
                  "name": "Epivir Hbv"
                },
                {
                  "name": "Ergoloid Mesylates"
                },
                {
                  "name": "Geodon*"
                },
                {
                  "name": "Haldol*"
                },
                {
                  "name": "Haloperidol*"
                },
                {
                  "name": "Infergen*"
                },
                {
                  "name": "Invega*"
                },
                {
                  "name": "Latuda*"
                },
                {
                  "name": "Leucovorin Calcium"
                },
                {
                  "name": "Limbitrol*"
                },
                {
                  "name": "Lithium*"
                },
                {
                  "name": "Megestrol Acetate"
                },
                {
                  "name": "Mycophenolate Mofetil"
                },
                {
                  "name": "Naloxone Hcl*"
                },
                {
                  "name": "Naltrexone Hcl*"
                },
                {
                  "name": "Pegasys*"
                },
                {
                  "name": "Peg-Intron*"
                },
                {
                  "name": "Perphenazine*"
                },
                {
                  "name": "Pradaxa*"
                },
                {
                  "name": "Ranexa*"
                },
                {
                  "name": "Rebif*"
                },
                {
                  "name": "Revia*"
                },
                {
                  "name": "Ribavirin*"
                },
                {
                  "name": "Risperdal*"
                },
                {
                  "name": "Saphris*"
                },
                {
                  "name": "Seroquel*"
                },
                {
                  "name": "Serzone*"
                },
                {
                  "name": "Sinemet*"
                },
                {
                  "name": "Spiriva*"
                },
                {
                  "name": "Stalevo*"
                },
                {
                  "name": "Suboxone*"
                },
                {
                  "name": "Symbyax*"
                },
                {
                  "name": "Zyprexa*"
                }
              ],
            },
            conditions: {
              decline: [
                'CNG053001',
                'BPL003'
              ],
              seeDecline: false
            }
          }
        },
      ]
    },


    // AMERICO
    {
      id: 2,
      name: "Americo",
      nickname: "AM",
      logoUrl: './images/logo_am.jpeg',
      products: [
        {
          id: 201,
          name: "HMS Plus",
          nickname: "HMSP",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        },
        {
          id: 202,
          name: "Eagle Premier Level",
          nickname: "EPL",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        },
        {
          id: 203,
          name: "Eagle Premier Guaranteed",
          nickname: "EPG",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        },
        {
          id: 204,
          name: "Ultra Protector I",
          nickname: "UP1",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        },
        // {
        //   id: 205,
        //   name: "Ultra Protector II",
        //   nickname: "UP2",
        // },
        // {
        //   id: 206,
        //   name: "Ultra Protector III",
        //   nickname: "UP3",
        // },

      ]
    },


    // TRANSAMERICA
    {
      id: 3,
      name: "TransAmerica",
      nickname: "T",
      logoUrl: './images/logo_ta.png',
      products: [
        {
          id: 301,
          name: "Immediate Solution",
          nickname: "IS",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        },
        {
          id: 302,
          name: "10 Pay Solution",
          nickname: "10P",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        },
        {
          id: 303,
          name: "Easy Solution",
          nickname: "ES",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        },
      ]
    },


    // FORESTERS
    {
      id: 4,
      name: "Foresters",
      nickname: "F",
      logoUrl: './images/logo_for.png',
      products: [
        {
          id: 401,
          name: "PlanRight Whole Life",
          nickname: "PR",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        }
      ]
    },


    // COLUMBIAN FINANCIAL GROUP
    {
      id: 5,
      name: "Columbian Financial Group",
      nickname: "C",
      logoUrl: './images/logo_cfg.jpeg',
      products: [
        {
          id: 501,
          name: "Dignified Choice FE",
          nickname: "DCFE",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        }
      ]
    },


    // ROYAL NEIGHBORS
    {
      id: 6,
      name: "Royal Neighbors",
      nickname: "R",
      logoUrl: './images/logo_roy.jpeg',
      products: [
        {
          id: 601,
          name: "Simplified Issue Whole Life",
          nickname: "SIWL",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 45,
              max: 80
            },
            bmi: {
              min: 16.6,
              max: 41.1
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        }
      ]
    },


    // AIG
    {
      id: 7,
      name: "AIG",
      nickname: "AI",
      logoUrl: './images/logo_aig.png',
      products: [
        {
          id: 601,
          name: "Simplified Issue Whole Life",
          nickname: "SIWL",
          payout: {
            min: 2000,
            max: 20000
          },
          underwriting: {
            age: {
              min: 50,
              max: 85
            },
            bmi: {
              min: 0,
              max: 999
            },
            drugs: {
              decline: [],
              info: [],
              seeDecline: null
            },
            conditions: {
              decline: [],
              seeDecline: false
            }
          }
        }
      ]
    },


  ]
}