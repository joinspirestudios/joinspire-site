import { useState, useEffect, useRef, useCallback } from "react";
const FOUNDER_PHOTO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAALCAJYAZABAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/AO8aclyB0qVGJFRYBbJpl0flIFFkMVpbdycdalgvxaoQ4rPkvEurgkdqs7AyfLUYhIbNP2YFI2BUPLPxUuzAqKfeV+UVRYOrZbNPDg05UzVu2jAwcVaUc04imEU05pMUBMmoLo+XmiB94BxU7EYqpNjrmq6x7nyfwq0Rsj461m3ExZiDVRh2AoT5aHctwaryx96YBihjgVWkY54qFkd+madDAytk1PMgZazpYXBOKZtI+9THqtOeKpzN+7461lSM+arSqWOTVZ4lzmvaxc/vAta0X+pB701cFsUy6XiiEYUYq1DKc4pLyLzU46+1UUspFbcuc1q2iMq/NUjDmmMKikBPSlgULyRTpJVLADmpIgCOlNuLcMpwOtZxh2Mcjigy7eAKt2jFucYq2elJ1oC5pkmFqPeKkjcVU1EjFV4bhFXA61I8uec1WkZmPFW7aPC5IqSReCKw70FZeKai4XmmSMFFRCXnpTmO4VCRTJAQpqCIgvg1dCDbwKay8VCwNQuKrSHk5qpK3OKgcZBqlMuM8fnVMpkmqs0ZycCoTBuHvXqyR/vd1a8RbyxxxT43Abk0lyc9DU9snyc0jHD5xU8bknpVpCMcilDKKUkYqGRsURMrHnFSPECOtVxbqHyDVqNQoBpXdQKoTYLVEEXcMircZRV4oWYF8ZqUyADmozOB0NQyTZNR9RSbsd6p3MhY4zVb7tMaVgfardnIHODWrgBRiq88uwHmsW7l8x+KiLMVqJlJPNAQg9KlxhearSthuKj8wHg0wL82atq3y00mmnBqvIKrTLnNU2iqLYM8GoJUA96qSCq0oAqjcMdwKGvWol3SCtf5Ug7ZrJZ3M2V6VoW0bSYzWtFCAgBpfs6k07YiDpTC2elN6ck00vUDksaltuvNWHBPQ0xQFPJyadIcrxUKgtUcoxSRx7qbOpXODVASuknIODVjz9w+lNMuKb5mW4qQy7RzULz5yO9V3yTmmt0pgQmlQGNsiryXTbOaoXU7M2KrA4OanjBkIAq0lqO9EkAQcCqk3SqEo9agKc8U9TirMZBWlK1GwxUDsBVeRhUEv3TVRl2csTUDurdDVaZcDNZ9xIOhqAYA3V6wmcgip9zP8uau2dluwzCtWKBUHAqYChhioZTUS04xEimGPaKiK4NSQrkipJMqPeocEnParCcrg05Y/QVBMh3AVatoAFyajuYVHpUDRRbCe9Z8qgOcVGVzUtsqh8tTb9kxhKpiikNKrVIFyMmo5OF4qm/LUijnmp422nir0MobGaJ3+Wsu5crms5pNzYp23NTRwE9asiIKPekYbRVSVsk1Vfqaru2DnNVpJCx4/Kmt84wapyQqpJyc1Wu5VWMjvWOMyyH0q0IwE5HNeqICeBViFcOM1vWmNgqwKdTJCAKqs9NQnNWEbjmo2ky2KZKAKfA4FJK4LdKkRQV7U3vxVuBeOabMqhqkjbCc9qpXk/YdazpJGPANQnk1IIzjNHlswOBVOYFXw1R0opKVV+apiPlPNVpAR3/Cq7Dmkx8wFXLcLt5p0nyHPOKDKpXmqU43A1nPHtfNOTlhWihCoKrPdANSiZXFV58IpJrJnuzvIFQST5BqqS2SV/Ok81wKpzzOTzkVSlkycVEjBGBxVrzFdOK9Tj4qzH1zVkXRQYFXrScsOatk/Lmq0jljTQM0mMZz+dN85VPJpJJRnAwaZ8zHmrEQxU3kA805UApvAYGpC7YwKYoZ25qyV/d+lZd1HyxBqgxpAcGpxL8uKkjuFRTnFVLgrK2R09aqEYNBOKACelWoId1SvbZXtWdcoUbiq5PHFNPWlEjKc0PcFuDUYfnn1q/DCJUJqleRCMGs6GQb6viVSmKoT430Bgi571n3VyWJGaol1B55NJhWPB5pxITaDyTTpYiIvMXGKoSFZAcjmsu6j2nKmqxbI96j8116GvagMVctY93apzZd+lLBE6vz0FXHYhBVfeMmnhwO+akKF1ODg4qolm0rZJyDVmOzMJwwqcQZHApjKYzxTllJGDUUrkClhYtyasAgDFL5m3tVee5bkDNRoTKnJqjMu1yKiPWgNTHyaFAA5qKRhnjrUQBY1aiG1eetXLbBNW2UbelUbuAMKzmgxk1Wk4OKaFJ5qKZdoJ9KqLM28Cte3uQqdaqXchkODWZKu1s0wylR1prTgjmoZZyQQDVRl3Diqc8bBqRDtHWhXLMNw4FW3uQINgI47VlyHknIBqpO685P4VlXFyASFIFMWQsoNfRUNqrL2qXYIBkVJDN5hxilcbTnNVZ5CxwKjC+9PC4GTVuyVpto3AitaytAmRkc1LexqoOe/AqgnUjIOOKe8QYc1TkTaeKaIy9OKbPaljAJ5p0igciqFy2cjFRRzFFxionJc5NQsMmnBDQRUMinHFVl4Y7vwq5EFPIqbA6VJCOeKtBscGmSYIrPumCg1mOQWyaVX7CophnrUAiWq10ZY8eXyO9SWspkj+cYNEuxuCRVGaLnKkVB5YY4NRzWzA/LVRn8uRd3TOKdPcoIyQOehNZb3WZMD1xnFTechg561iT35V2Cnv602G8ZwQcfjTY45LiUgkhfQCor6z+zNuPccZqupG0c5b2r6ZhGwYp7oJBzUBAgyapzXwZsA9aZ5gIyM05DxQ5bbxmtXRoyvb8fSt2BsHoNvaqupSFkG3HFZ1s2X565q72pjICaVUUdqhusBTis1SQ2cmpGuAFwazNS1C0sYWnvrmG3hHV5XCj9a4zU/ir4VscrHdS3jjtbRFh+ZwK5y5+NdmXIttFuGTsZJlU/kAal0f4v2k1wRqGlywwk/K8Ugcge4OP0rrLf4h+F7hV/4mIiJ4xLGy/0q8vibRJBmPVLQ/8AbTH86ntdV0+6KrDfW0rt0VZVJP4VYmRcA0R/KDSq5Lc1ZVgFyKfHJk8mnSSADis25YsxABNVZIwBycUyJRgkY4psikvgnmonIC55qCR8jBI/GmRleRxWXqMsiSHawA6VFB5rgknjHerSoxX3q5AVETK2C2M5NcxqTj7WQp/d56iqty6qntn1qkXMhz+lDpI0X3jgc1lzQkv0PWrVlYsSC/A961WngtovkA3etYl/NLdPkAt7npUAjKJgnnvX0nczCFeTUFvfBm5PFNvZvMGF71mCICTJ4xW7aWqSwhgwyR0pPsLbmAwQKa1owIJ71rafJHEuGIzV0zox+VRx0rP1JysZOMtjrWNZzyCbLitM3YpDdZ4FSCfd0pJgTGTWLf3tvYW8k95PHBCnLPI2AK8n8ZfFy3tlkg8PRedL0+0zDCD3Vep/HArxXWdZvtYuzcajdTXMp/ilbOPoOgH0rP3n3pQ/1q7aSgJgMN3p61YWYjqeamjuG9QfrV62uDvGxBnqMNg12Ol+OdXsCiSSPcRLgbJ/mwPr1rsdG+IWn3LhNRja0J6SA70/HuK6+C8triJZraeOaJujIwIq0jblGOtMlnWMkdxTI7gu49PTNaLCL7MWJAJ6Vyup3Tec0cRxjrUFrcyQtluQevNPfUC+QMZqvJfqhwxJz2rKvdTcSApUUd/K3GeTTrk3DglRuAHenxJMo5yeM8VouDFDncScZqqlw0oKHgYzisu/t5GbK9eorOkQgYf8qiLBfY1dtGDoc9DUVzGqHcRhe3vVeeV9hES4zUEMHmSZnJPtWp9lVY8ACq0tnuRu34V7lfQmQVmiF1brViNCRk1BcxMxGOKvWlxLFEFPYdav296pGCMH0oldpRhQwz3xUKJ5TjeSeexrStpAMqPzp9whkALCsm6Ta3vVZyw6U+It3q7AvGa5Lxx4/sPDqPbxYvNRA/1CNgJ7u3b6da+fPFvirUvENy02o3G5UPyRpxGn0Hf6muPmZ3JJ6VCT70A0oGelTwowQnHPvTvm460qq24ckVopyQehAxkVZSaRQPmNS/aCQOx9xVqw1e60+cS2c7wt1Ow8H6joa9U8JfEPTrtI7fV2+yXPTzD/AKtvfPauyuo4pirB9yNyCDwQau2sUMcRyAD2yao31y3mbEYH+lY06FW3nknqagdsqfSoVAZgCcUy+t1Ck5rEnTYCeT7mo4JCGyx/Kti3lJUKRjIou5ZFU7RjsaqrdzSYTnb0q80XlqXBPAqvLPkDpgdqxb6TcSE4xUVlay3DggcE9cV0KWkdvbHdtLCqLJ9okYYLHoPap49MCckZ9zUM1iA+R2qRkwuKqzHAr2iSTjjpVZjuPSnqCBTgtBAIxUbKV5B49R1qe3uDGPvZ+tP84MSGIwey1djmjRAV54xzTX1LggZqqzNKdzUqRhjRKyR9cV5b49+IrRrJp+hSbQCUlul6n1VP/ivyrx29uGm3BiSGOTk5LH3PeqYg3LlulZ96pdysa7UHf1qr5QXO7j61GzKOlN809hSrI2Rk1KrnsxFSpluhY/Q1cijJGQ8i5pwMydGDj0I5pklyQMFMHvSCYlcj9TQJD1B/Cus8I+N7vRJUhuGa50/oYWPKe6k9Pp0r2rStTtNXsVutNnWWFuM91PcEdjQeDnqTStbPMOhqlPatEvIrLkYrKSDRNvePJOay7huSPSqy5L4GPwq/DI0YxzmrLFpRzzigoiKSevWnmcyqUHeq0qMh2kHJFVVsSZMyD8PWte2CwRABcHGKYI5Lg8jC1etbZIh0GadNjFU5QO1U5eKpTDrXsBOaQ/KPempJ60/dUkYyaSbgcUyJS555xTLj924Cnafapd7mLljxTYZhnBFXAd3SlJKKa8v+Jnil7dn020lKNj9/Ip5UH+Ee5rx25lEsj4IJHG0fwiqjMBnFRGQYyxwo71QubnchMS4QdzWY7s7ZJJptJmnA81Ihq1CeRt61pwH5Bnk05xgYqrN8wwRVKRSucH8KYHGeuDTvOYcNjFdF4J8TzeHdVWQMzWUpCzxZ4I9R7ivoCGWO4iSaFg8bqHRh0IPQ1pW93HFF2zjvVC7WW9XfEh8vP51j3cPlbt4APYVSkcuMDiqckBIJ6Uy0QRzNvGM1oTIjbSPxp4wkWcDis1pjK+F5960dLt2I8xh+dWHiAmXapZ+pJ6AVZS3EigAZI746VL9kRV5GT60m0LwAKTvUcykiqci4zVSUdapzHrXrUTUrtmosHdk1NH0qdSAKRhuOTU0CY6VWubdpph6ZrRjtAIcHmqUkMcL56UouUU4zmqXibXbbRdAu9QnIxEnyqT95jwo/OvlTX9al1S9kczEAsZJZP7zHqf8ACqVoDJ+8IKxD7ik8t7mnzzrEvPXso6mq6o0zF7nhR/B2H1qrdOZ5cIMIOAKiMJUcg5qFhzTaUU9aswnpWnbHge1TMPSqFweT2qozjODULgdc0wSFeOoqQEEZQ8eleyfB7XDdaTcabO26S0IaIZ5MZ7fgf513JBlcAjA9K2bbUY7W22Ov3eBisLUpVuZWlxgHnissOoIBqZtuDxwareX+8yQeauxQg4DcCp7sRNGVUjBqhFaqj71Ga1bZCyjqSOw6VZS05JfjPYVOFCjAGKYw5qN1GM4qszfNTXbiqVw1UpDxVKXOa9bGe1PVc0bcU5RUyjFOByani4q3DGOpFTkZFZGqWzNkjNY4Uq2G615F8e9bIfT9HRyFC/aJQO5PCg/qa8chjR5P3zbYlP8A30avm4AQfZ1LO3c/54p9pbqA0kuXlP8AEegpShaIqOS1OhtFTB7+lV9RTDccDFZD9TTaUVIo9xViIcjBH51pWwO3kCrLr8hrNuulZ7k5qPdTTzQhw2a6j4f6l/ZniyxkziKdvIf6Nx/PFfQax7FJ7g5qjeOzthc9KzpBLnAptvEfMDtnbWgIlbBznBqdxEF+Y/Me1MBGMJTHtS7AsxOOwq5b2m7AboOwrTiiWNcAYpGqPHNROcGmuDtqlIjb6a4wOapTck1UkqpJ3r1xVqQCkIzSqKmC8UAAGrdum41eRcDFOxUN1jYQRWNLa75c44r5W+Kl217491gljtimMK+wUAVyLYJUDIGOlSxkrnnr2rQikKwhc/e/yaf5+W2xrz7U6J3Evz4zSagAy/hWHKAGqOlFKBzU8Sgct0q9AF7MRVwZIzuyarXKnncD+FZkoGcA/nULDBppoHNX9K3G/tfLGXEybR77hX1Eyyc7hyaemlu6Bz1NV/saK5DYzUckMSMO/tSNHkZAAHpRHYNJyeKnSzWM8nJqTZgcVJbqQatNULCoycZrPuJ9slWI5N65FNkAxmqEr5OKqSVXkFVJa9eFL0oFPTGaeT0p0a7mrRt02ipwKUcVHLGH6kVA1vgj0FfE3ie6+2eIdUuf+e11K3/jxrOVSMZ6mnA4PJqRJGkYdFUVftikabiQigck9TRHIzzfKhC9vWpLpcocc1hzjDmoQCegzT0idun6Vbj024cBhG5H0xWhb6DdugZQg9i1XYPD2onlREee7U6TR9TjODahgBzsNZ11DPEcSRSxtnHQ1lTFiedp/nUDcHuPrSdabyDVyxmaC4huIzh4pFbPpggg19UmV3hjwMsQGzj2qzFdSrEV2kmqZgmdyzHGTmnG2J+81SRxIg4HNWLcAnBqV7cE5oEAApNgXpUMsgU0gIYVDKcCqhjWU89amjj2LimSdOazpVw2arSd6rSVTm716+KDQBSjrUoq1bLzWgtOFI3TiqMrSB+M4q3Cd6YJ68V8N6vavb69fWsvDRXEqtn2Y1UlYA8HGf0FRde2B6VMrBCMjJ7AVdgHy+bLg47E4Ap0dz8xIG4+vQU/Fxd/JBG7/wC4OPzqzH4blwz3jpCR/COWJ9KsppFrCBn5n44Y/rVhI4oh8qKv0FTRsAAVIz9OtX4W3RrwNxPU+ladn8rglxxzjHSr5fdEcuuc88VmXqqQwK8Hjp61i3lhbT8TxDpnJXmsK90KPG63coc/dbkVhXlpLbPtmQoT0P8ACfxqsQeh61a06F7m9gt4xl53EQHqWOB/OvsFbQQW8MOATGioT6kACo3UDpUbLxVdhinAAikU7WqyswI5qKW4A71Wa5OeM1BI5dhnNWomRV61HOm4cVViUhqsHpVWdsVQmbmq7HNV5cY4qjMeDXsSrkZzQBzSUq1KtWrc4q6pyKeKcKjm2gdqbCc4r5O+NOmf2T8SdZJTbFclbmPjqHGT+oNee8uxc9M8UudvA5Y0Kdp45atHTNOvNTm2QRGQL94/wr9a63T/AAvbxruvZDMR1VchB7e9bztFb25jREjRV2rsXH4ViltyjaQ3HJP51Sc5J3dR+tNbpnHNOiHz5GK1LYlVIwOR6VrW6kpkEcHkY4NSkHzSSwOONuKgu49zgLuAIz0qldRMPUcDknvWaU2nGM0yWGOeIpMgdT1BFctrWivaKZoMvbjqO6f/AFqq+Hwz67pojYLJ9qiw2eM7xzX2Pd/Kxz6ms+VsmmZFRSLmo+RSA5pXGKqydasW0YI5qSSJKqTJjoadE/GGpTt6imykY4rPuCTVKRsDmoSwIPNVpW9KpSnivYo5Dil3Umaepp6mrEJ5FX0PFSA0jyBBmqUs+44zxU9s+cV4h+1LaQi10K8CYuS0sJcd1ABAP4mvA5f3Sqg64xSJGc9CWbgAdT7V2OieEfLHnaqSrkBhbjjg/wB4/wBK66GKKKLEUSIgGAEGP8imq/BSLnJycdv881DMMq+4Ehl43E469PesW4RY2O0D3P8AhVHOM9fwp44+9kinouDnn14rRtSu9OSQAD0yRzW1B8uCASG5OelB+WU7FGPUGtKOMPIeBjH1zVXU7YqhIPGDkmudnhbfuAwB6dqgZdvABpwAIKOMhuCPUVwMH/Eu1pdx+WC4B9cBWz/Kvq7TfEmm69G8ml3cdyqsQ2w8j6irTdaYaQ1CxGaaXAOaR5QRjIqvI6/3h+dLFdInG4fnUrXUbDO8fnVWW5j/AOei/nVWW8iUZ8xaiTVYQcNKKJNVt8f60VVm1e2A/wBYKzLjWLY5+cVTOsW4B+cfnUf9s2pBy/61UudathnDj869yDgUbs04Gng0obFSJLtNWVux61Mt2PXmorifcODVeM5NX7YgYzXI/GPwwvinwZPHEwW6sybqEnvgHcv4jP5Cvkh1AkMrdP4RXV+DdORYhqU67pWz5I7KOm761vpKykLli3K5PJNSwyFpMPIQc4I/yatRqJAwA5B4+vSqsrxor72Oc4xk5/Csm4kEjhlwMVVwDnqDQAxPT8KsRLkHParVqCCe/pWpA6hQU3dOQ3Y96ebkB9wGMHkdKsnXYII8AhcHGM9Ky7zxDDcB1RhgdMf4VTW63E5Vue3UVFO4fKlitRGbaqhee2TXE+IGCa5dYJCsQTj6VZ8OavNo2qQXaTzRBcFvLbBYf3T7GvVoPihDNbLLKphY9VJzTZfidbDq5AqrJ8ULfs5P0BqnN8TkPQv+VVZPiZnosh/Cq0nxJkPRJKrv8Rrg9I3/ADqq/j+7bpG3/fVPTxtqrgeXbSMD0OTUd14u1mNN0luyqe5JrPk8Z6k46qPxNVW8Uaixz5iio28S6kw/136VE+v6i4wZ/wBKgbVr0/8ALdqYdSvD1uHphv7r/nu/51G13cN1mc/jX2NJqNurcyClGr2qj/WD86Q65aL/AMtB+dNPiKzX/loPzqGTxRZr/Gv51XfxbaA/fX86iPjC0H8a/nTH8b2i/wDLRfzqu/j60H/LRB+NRH4iWaD/AFyf99VE3xPskP8Ax8J/31UU/wAWNPMTo8ysrAqwz1B614B4gMJv7g2n/HsWPlc/wk8V3mihBo1mOieUtaEPl42jA7DNSxwMdxBXYvXd1qO8v7a0yBhtvJI6Zrn7zW45WZsZ9exqiupwt97IqdLiKTdsYEGpFckjJ/GrAYAHJq1bHj6c1PLOEXd90AetYmoanLISIDsAHJrH2NI+ZpD68mr9q1vb42EFjnPOauHWItuwui9ttQteIy4GPoKry3KxqWYjA5rn50a8knudoyxH4cH/AArOTKOc5Cd6kDEjapP0pEJf5G/OrA0u4bkLxTv7JuPQ0v8AY9x6Uo0af0NOGjOCPMcIPepRaWVvncGmcf3jgflThduZiFJCkDA7CrNxKyxKQfvVmmyS4fKDa57DoaX+yH9KP7Kf0pDpbDtTTppHamnTyB0ppsSO1MNoRXTyeNNUf+Jf1qBvFmqt/wAtQPwqJvEmrP8A8t2/BajfW9WfrPL+AqM6hqj9Zp6b5+pN1kn/AO+qTbqDfxTH/gRpfst+3XzPzpRp1638LfnThpF6f4TT10O7b+H9Kk/4R+7Pb9Kh1PTJbI28dyChfoSPeuk0K6P9iwRyHEkZZGH0NWUuQpPQ+tFzqDSArwRjHXFZdyxlGGcgduaoS28QHUgj3qmyIp+Vs/jTo2wflyDV+2mk4yCQPar0dyCMKTVy2uVC5PripNkuoO0UO1VUbnd2wFX1JqF7PSbRSbq8u53HUW8IUf8AfTn+lVLuXRmhkaDSr2TbyGnu8AfUKv8AWpvDDm91Ax2VpYWoVCxDBmzjtknrXZ32g50mLWNNms7shfMMN1aoy8dq5iHxJNDcSedoukZycqLUKP0NUdbi/tuS2e1sYbSV3ETJCSEcnocHp3qtJZNYQmGdVEu54+GDD5SAenHXNYDRqr34cfL5XB9D2rJRznBJxVmCE3E6RoVDucDJwPzr1yz0RIrSISeWWCAE568UklnaRj5pIh+NZ95LZwLlAHPsKwry6Zh8oxnsB0rNlEkqAE7cHvVKaNU3EnJqu0gEwboCOOauzSCS3Vh/CarW8hWQHOK7nTLJb6xjnUdeD9asNo/+zUL6P7VC+kgdqgfSx6VXfTB6VXk04DtXSp4PX/nmPyqwnhBP+eYqwnhFOPkFTr4TjH8AqdPCkf8AcH5VMnhaL+4PyqdPDEWfufpUy+GYv7n6VKnhuIf8s/0qZfDsf/POpV8PR/8APOud8Uz2mjbIQEa4ccDI4968xh1We/uRb3EKXSM5Cow5X3BrUvbOX7Gt9aKY9x2TRnjbIPX2YYOfWqNvIWyMkN3B7VZt7aa5dFRkQE7d7nAH41ch06wVH8+e6vJ1yBDaqFUEHuxzx9Koam1pazlYbO1cMuTud32H+725FdFYaRdGKR4bbSpSkSy4iQBip9M96xbme6R2EU0iMp5iZQCP0rR0PxJq4m+zwPHI7/KFaJW3e1Gv6fejUFeexFtcS/eijTbn/ax2zn6VJpWg3V3cRxN5MG/+OaVY1H1JPFdTJ4ctNNiaP+2bG8uG2loLNjIwH94t93A+veua1nSIYL10NyskIBKSKDhjUGn2ltNDLbyMo3DjJxzTLLwfeyXA2SJGneVW7fSuv1i6tdH0IWEMwyE8sKOT7k1wcSlvmYdTnmuxPihYtPaMaXp4kEaxo/kKSCM/Pkg/N0HFcNr2ozX+pPdXTKXcYwqhQAOOAAAK5zUpQtsw/inbd/wEcCsoAZ6ipoVZiQoz9TW3FfSxQojXDhVGANx6Uv8AaJP3S7e+ab9tkzyQPfrTDcSOfvsfxqGW5KjA5qJpDJAx9qry8xqfQ1agObZwPTNVmchuK6zwX4hTT5Tb3ufs0h+9/cPr9K75NS06UZju4Dn1bFTBElXdGVdfVTkVBJbk/wANVZLZs/dqrLat/dqpLaP/AHa9kGlDP3akXSl/u1Iulr/dqQaavoKkGnL/AHRTxp6/3akFgvpTlsV9KkFkvoKcLJfSqGux3Ntpcz6dEsl3j92pHU18++JYL9dY8/xC80DMvyIy5ZsngfTrXO+Gk8vXXL9IgzGu1t9Ytr2SdDFiIpslTrnrg0+98LW95Gby3nWzjEZ4I3BmxwOPWs+x0u4a2jS4RkYgkqev+ea6Xw1FbQLKsZC7tpBbHB6EVQ1bwh9ounmtHj2yNko5+6fatvRbLTvDWnSpc3iyXEwwyp8xwOigVxniRxeXbyIFjXPHdv0pNAsZRdRSxhhIrAqVB3bu2Peuo1G+mWF47ueczSnAYPg7lA4P0GKwYYWuNwyxJ7k5yak8PXj22uLa3xcRspyQeGXr8vYHGa3Ly2SeNygEkZ6d8fWsGfTZFfMTZI7U2JbyM/LIoH4/0ps1nPK37+QOOwA4pRbbeFFJeqRbjI4J4Ncpq5+dVzgbsH6Vz+oS/aLtnHCjhR6AdKq/1qSJmVsr1q7GRtPTPrS5J781KoyvPXtQSQMVWnbninW5yhHtTGGYGHfrVixORg96qScORUkLc1bWRlHB4q3Zapd2MgktJ3jI7A8flXofhXxbb6kVttSCQ3R4V+iv/ga6yS3T0qrJbp6VWkgT0r2LyhThD7Uoh9qeIvalEPtThDThDThBThB7U4QUG3yK+ev2iIvI8QaYVlBYwNlQeRz1xXnOlyh7hLkHAcGKX2PY1oaMjW+ryxn7rof511OlXtzb3MSxzSKqHgA9M1t3rXl2qkXcpJU/xYzXNyxz2snG5T0yD1pHvLhlILHBwKqt5jk4yAeuO9aGl6T9oPm3J2Qrzz3rRYF7qP7NEyRRuCoj6kjoPzo1XS7k+R5hJuMNJLznZuP3frgDNV7O1MbBc9+tdAmkQTCKXcFmjwUYjIz/AIdqs2o021Iie+W0c/ejnjbHH91wCCPypLqLTp4yxvLXOeNrE/0rNksrUj5L23I753Z/lTDZ27Hi6aXAyfLjP8zVe6WCIYiibf1y7dvoK56/lcnDscA/KMYAFclrr4xtJzmufkyr0Ahh70qZDYNWo+DUm7nipowe/WkmOAaoynJp1s2HqVcEsp75FLZHB5qK4GJXA9abGSD0q2hyKDwDTY3weDXb+GPGsloqWupsZYBwsmcsg/qK9BjniuYVmt3WSJxlWU8GoZO9e2CMU7yxShBTggpwQU7aPSlCinBRShadiuY+I2unw74Rv7+J0S4RMRb+7Hgcd6+TPEN1q+sJ/busPJKJz5McrcBtvUAegzWVpk/2ebc/MLfK49R610cF3svoA7A7DgMP4lPf+VdDGxVgRit7TtQDCOKQqoDZBP8AL8q05NLbUixt3gxjjfKq4+pJrFvdGmtW/eSWgycnE6Mf0JqOOKzgy1zeQ5GD8uX/AA4FR6rr1gkbBDPP2GEEa4/Hn9KmttXf7Epgzbs3Py8sPcmug0u5eSQCFPvnO51zk/jVB1/4mZTjJPGBWtPHJbR85Axway7kteKY3UfKcqx4wahREBAlXkcEj171ajghBO3GDjnPWp2WGOMlCPc4681ialIqsx7Vy99LksTyelcpq0mZBg9M1kyZ5zUecMD2qVGBGT1qdDxzT061bjqKeqLnmmxthxVonEit60seFlI9DTbzib6jNQZwat27Ajk4NOmyOtQZzUUrGur+H2vy2GoJZzOTaXDbcE/cbsRXqUte4gU7FLilApRTgKUUopaXtXzb8e9UurzxQmkmV0i+UgFvkVeOceuc1xfxQSKz1S10izIMFhAsfGQCxGSf1rig2PlBB961bGdWtysmSyfcYDmuwtJxNBG4IzjmpvMxxk8+9XbG6KAK7fJ71PNcxyM20fMe/b6Vh3su4EZ46n0rFmKvOisx2lua7izu9Lg0aNJo3a9U5yp4bP8AeqoPEUsEx8rYmRtAHUClttQYXQuHfL5zkmt7UvGAjs1ISMuByWGf0rn4/HkaM6TW4DOfvNERWto9z/aUE7gYVsAH3qwZTE3GcE1XubwhQM846d/xrEvp8lvmLc1z+pzhYic8k1zN0+6brwaUW4ktiyjLA81nHrg9qfGeTmpUbAxU8XNXIz8vIqG4waoSdaYOtWc5jUintwyt0yKLoZCn2qsadG2DVkPuHtUTuATiq8jc1JbEqwIOCDmu68MeMXRktNVYtH91Zj1X6+or61FOFLS0opacKBS0Enacda+XEuV134o3Gp6tsFtZSSSzIFyFWPPBz24rkrm8Hi7xu11qEhht7q4LyMePLjHQfkMVga0bd9XuhpqbbXzCIh/s9qjsJTFLhuneuh0u7CMI9xwTkHrW5HICQeCMdalSQKvPU+tNe5OMchR2qtO25eT1qj9jeVsxA7gDTb6G9aL5I2OPvBD2rE+yXO7cYpEI5ySa07I3DJtdmY9q1dMRmuEabgqeKvHSbG8lM0rMrk5IBxzXVafHDbWaxQ42AcAVFPJvBDA/3qxr2XBKlifpWVdTjGBnPfJrm9UnLEgHBHpWMevPer2nMpYoTjNRahZlCWUfX6VnrxwRmlU1ahPariHj6VHNyKoy9aiqzBypHrUpGY+c8GknwYVPXBqqacuQeKkD8VC5ycVH1YCpl4B9aQsRIK+8hSilpaUU4UopRQaBXB/ELwVa6j4b1YaRZRpqVwu/MY2mRh6147YeBn0PwXqer6+HsrwN5dqp4Lg8EFT+NeXS2MwmLQKzjPGBVdlaKbEo574NW45NrcdSOMGt3TLvKBWJ3D1rRMoK5J/CovM69SKch3EAd+lbVjbiNPnPXg1JM0KbtpQkDkd6y7u4WTCoh29z/UCo4YjGwbYxOMjipra2lm3CKOQsM4IHSrSW01tCvnROhXknaRk1JY3brIhbIGMnntU0t6MAsCu7p71m3cqzfNH0rE1OUxIxIwQK5yaTfnJIPf3qDOOn6U6CTZKpHrXQSYlhUkdRWBe2xgzt6HpVZDkVZiq3H93I6dxQ/wAwqnOKrnrU1ucNVpsAkHoajJzEwPaq560A804n9KhJ70J6mpFpM5b6V95UtOpRQKdSinCiis/XtXs9E02W91CQJCg6d2PYD3r5t8b+K5fFV+0lydtuhxFCDwg/qa5K5OyCTyjhj8uR2zWY0apO9rMgCn7v1qvdxeRNs4yowcU1JGjAZWIxwCK2rO8EqAOcE1bBGKltyEYZ5BP40+81MqQisVGMEdKhtG85WeSQLt6ntV1rouAsCBcDaZG5LUsF1NH1nOPQ1e+3u6bS+2MgcZxSrfCAEpdyKP7ucj9ain1u32FJkjbI+8o2n8awr2/im3CIttU5HoDUdvcszhWJPHHNUdXmy20dCO9YzH5ePXNRP93NNXJcV0ln81ovtUF/CHib1rnsFJCDVqHmrkZwpHfFNJ7VBKMg1VfrREcOKuzHhD7UxeXYeozUCjJoIxSMflJqI84FSDgUZoBxX3kKUGnClpadSilpaM4GT0r5t+KviC88Ta9LDalhp9sxjiHY46t+NcMmnyRsd7ZamXMOIXDE8jr/ACqF5YnslvJUBlXgA/3xXPNMXkZmOSe9TKQy4OKlDlHyD0H0rVsrtZAA3B7VcnmEaE9Sf51jSMWJDZz1ohmuFwghcrng+tb2n6Xqt8AIEiUZx+8lC1bXQdVEm2RY8juGzUsmj3i4SVSvy9QOuDWzYaBBHamS4QNj15zUd9BZxowSGEJ1B2AYFc3qJR0zCoVR92stU8lScktnI7YrMu2MhOCMDiqb/LwcciopRleKIhlq6KwH+iECnyLuGccVgalDskJAptgQ0qhu/FaF2qg/u8kdzVMyEHmk3Z4qCQVGDg1cdt9up9OKi3YZTSONrGmk5pJDwKjTkk0+ikJr70FLSinUop2aKXNLXK/EfxCug+HpfLYfa7gGKFe/PU/gK+frbzRukm+7/CO5qrMftE7RpjK/fbPC+3uapXU7RypCkeVY4DHmsfxCdu2CAjyk9O57mufbIGBUqNzkckVKxyQcVPG2GBzj1NaMjeZF97p+tV0yHIPOa0bacwAAgEdxWjBqvKiJgo/unqK1bTX3R1G4HB6k8jnPFW9X103JgZdqmMFeO4OP1rNOryCIRrJ8vUDrVC4uLi4yNpVM5Oe9QyArH8+AvAOay9QcbevTpWQWPOeCartknnv/ACpr9cfjT4QFI3GtmyvYo1KSdD7VZWRHGY2BB96p30HmxdOawxmGb0wa24SLiHjG7uPWqs9uQN3QVTJwaRjmoj1qxbMCrIx4IqOTge4NOPzJkdqjHWmSHnFOUYFKaQ00mvvUUtOHSlFKKWlzSkgKSSAB1Jry/wAdfEi3t1ksNFMkkpO17lB8q+yn+teW3GtfbGL3Ny8rJ08xskZ9M1l3d1JNujt5QZSOW7KP8aesYihWOL7g5OTyT3JqPCgjJ57GsS9sTIXeMED0PesS4tyjYZSp96rn5TjHFODYJzU0TDjJ4rQjkwuM8Gnc5yDx2FTpEz4FONmSPU0DT5c53kfjV2ysC7jznZgO2a6iwt7aFNzAcDbj/wCtUeozQ4YRogHqB1rDvZo1Qk4OK5fUbjzZfl6dDVAEs3B6+tWvsrKpdxjPAqrMhDKexOKmmtDHbF92STjj0xWbipYbiSE/Ka0odTDALIoH0qvqCxuA8bAnuKNPnKOMHkVo3JMkfop7VmSpgnioaY1PgbDiprzD5dRwetRW7ZGDSEYNRD5nJp9FITSL1zX3oKcKUU6lozS15V8UfGhilm0ewkCqBtuJB1J/uj+teSS38RDZaq/2qI85GaPMj2kqwB9BVZ9rH5QuT7VWeFFBIZwSMcNj9KibcoKrKT3wwzVO4mOMSquMduc1nyorHK8fyqu6nvQpwMf1qRZWUYycdcelWre5CkbjWtazRtwD9MVaM6qR8wzQ93zy3IFVm1Rt6paq0s56KvNaljpGo3bA3LyRb+dqUuo6LqNoheOQzqoyU6NXKXd40iBcnrzmqRGW7in29vJLJ8o4HWte94CoB0GBWVqQCSIn93r9a0LdRLYBdwJ29PfJrCKYcg9QcUOlREc0vOMiliba4NbcDb4hVeZeTVKQYNN7Ug4NWYyGXae9VGBjkIPUUO+R70i8CnZopD1pegr7yFLTxS0tGazvEeoDStCvr3vDEWX69v1r5K1zUJJbqSRnJZiST6k1gyTSSHGT+FS21tcOC29lA96cRfRthW3/AFFOW5u1PzwE/wC6af8AbmAxJHIv1FKLpJP4hmllZGQEY5qhPHjlaqPz7GmBh0bg+tIxIYccetPAAyDnrUkMjICVzx71Kt10zn8asaba3GsXiW8bFVJy7/3RXoNhpdnpkIijQcj5mP3m/GtbTrofaPm6AYrprHS21y+s7DTwDdXb+WpI4XuWPsBkn6VQ+Kvwak0C3NzEA0IwsV1H9127B17H3FeJXdhNDdmGYbX67RnP4etdLZafHa2zyKq7mUcislk8y63H7q8n8KwdUbdOx963fDtt9ptrty2PIgEoHr8wU/8AoVYV4nl3cg/2jQUymarSLikXlSKjPBrU0x8oRViZcjpWfcLyar5I60uc1PA+1hSXygkOvXvVPqaeDS0jHFInIyaU196UtKDTqM0Zrjfi5KyeBL8qcZKA/TdXytdFpZyFyTmtHTNL3kM/4mr0xihJSNRgcVXd2Y/KnGe1OETluRRLGQmWFVZLeF0YtGue1VHtEAzGzL+PFVpIpV6EOB+FVZAP4gVb3qB159RTUbacH7p/SpWPzYPf9aXblDuJU9hjrTWH3sc+ldH4SuRawysFG9m6/SugmupLiQPu4+tLZajtiaSTAwSDz0xXoPh3+29O0+21fSZBDf7jIAD83l9l/HkkfT0rV8W/EO/8W6bZ2l7DHD5GTKE4DydNxHsP61wF3DE11DOYo5JI23AMKr6zJFPBi3Ty1Axs7rXK3KiGBz/E3FctejLVraLI6xkRtt3IA3uuelVdTTF25655qujcUyRc/SoI/vEUxx81WbFircGtPORzVadMjIqjIuCai6U5W5q0P3iEHrVJl2MRSZpc8U3qaeeBxSZr7zBpwNLRTs8U2uZ+JNm174J1aKMZfyt4H+6c1842WlLHh5ep5q3KyRx4XAGOKoeV5jFgeP5VaWJQowBihowADgZ//VVadd5/CoPL29OvNV3jx1HSqzpg81VkjLdaqS2/QjiqcikHsfpViwj+0zRxMcEc59qLor9ocLwuTSwxCboct6e1atvE1h5YcELICy59utTX94UizDIw+tY4uZFkDB23Zzwe9dp4d8Q6tHp80MUzQxMMM2ex9B2NatjJvjA5Aqz85fkZzyCRVS5jEmUlHPZuhrIvLATIUD8/rXNajo91EGdU8xBySvX8qZozYKg+hFSarHhw3c9azRSSHCmoIvv0ko+apLU4YVpqTtyajc8VVlAJqBhUfQ1LG2O9JcDcobuKrilJpRxRR1r7xzShqeDTs0UUyeJJoXikG5HUqw9Qa+efFugTaD4hmtC2+2Yb4WPdT2/DpXPTxeYxA6DmljhCRMxwM8Co3LgEAc1VkaVYyxwRmqbTyhvumo2u2zhgc/Sjzy2MjBpjyttwyjHsKrySZxhR7+9V5jkZwOaqyqpH3RRCxUFY4xuP8XcVC6MzcjNXdOt5FnUqDn2rYnglm5uImdgMK2eVFRxaW0h+dGI9CKtR6QB0hAx3A5rRtbTYmGQ7PStKJ2VBsRgvoDUhncdY3z6lqhmldjxHgegP6VUmLE5KEn61DJLKBhd2M9SefpWRPboJPMWHY+ckr0NU9SG5AayDwajlOVqGPiQU6Yc0tv8AerRU8c0jjK5FVnPNMYD8aZ5e7gfe9PWmIak6iqp4OKO9FKKdjivu6ilDYNPBpc0oNFebfGONBDp02z95l03e2M4rydGRQcnk1BLcBm54AHAqD7TGByOaYZk5+WoZbiPgKmWpVm6oVC7vQVVlTJJ6kdKi8hyvzHCn9arTQMCdqk/QVTmhnJPyNmqskc4PKn86T7XcxxlAcA8HAHSo4rplI34OK7TwdPa3UmxiomUEgHvXSSxRhxuRSAOKfbsoY/KBTmdQzfJ+lVmfb/ABSLJgcKGHqKnCEqS0eAOT9KiZ1LBMLnrkHpUMkXU5Gc9QeKq3TYB6Z6nArPdyytG+RuGAayL5T5WD1BwaxZBhqgc1D0cVNPjANNg+/WgDxSE4Bx06VAQWPSlKbRkmgSILeSNoQXJBSTJBHtjvVaTBYEde/wBaTORUUo5z60yl604U7ax7Y+tfdlFLilFOBpaWuU+Jlml34TuXYfPARKh9DnB/Q14BMScqPzqEwlh9KQQKuSevWq93KiAKoyTVZBnkdasRIXBI5I6c9KnRxKoUxDK8ntmkmmlkJWIbFz1xUSKxbEk429SKhuEjONqNIcc46Vn3FpvOfK25PeSqUliq9GUexY1VltgD95fzpkSywyBo3AI7qcGu40ue6aCO2kV2nxwpPUVZs9QkNz5HluJMkEMMc1fkkfJx1781F5hdSGBz0PtUUSSRS+YjMF9KtwzgOdxO3nIz1q3C9lOuyQ7ZQflwMcfWqcsRT+MMKozAEmqc6Z64rNvEbZnGfX3rCuF+Y81UfvUJqdzuiBptv/rBV8e1PSJpBx0PU0sirFx3qLypG52sc+gqvNHIvLIyj1IqEKWOFHFPELkYG0fjSNbOR/D+dKlnlPmbDegquY3VymOasJEQKUrX3Hmlpc0U4GlFFU9Ysl1HS7q0bgTRlM+h7V823ts9tdzwSArJG5RgexFVJG2iqz7mPGapyRPJMeMgelTwWzknBGB2NWZ4Y7Rh5kgU9cDtUTXAZwbSFpMdWfoaZLFLIC88yrx9yOmoIo/9XGN3qeTTSzv3JFRTQHbVCeI9+Kz5oyCeOKl0CFJdat1mUOgJO09DgZArs1V01lJRgKD8p9sVuHyfLdkQbyOTjrVF+GJbpn0pEVWYEd6dIhYBVIGeo9KjZONpHIGPrTVtyp4PUU5U2r+PNQSZ+Y5qu4yOOhqpMgxjFYd9aEncg5PasmeJ0zuBxSLYXklmbuO0uGtQ2wzLExQN6bsYzUaMAmHyBnHSr9jZJMweOcZHYjmtI2C7yWJz1I7VOIMD0pDAgJ45qN1CnIpSQRgjNU5Y4+Q0Y9iOKpMqMfkJB9DTQrKwDdKc0o6KMYpr4frwexqIMVOGoLV9xZoBpwoozSg07NGa8J+JdusPi+82DAk2ufqRXHsw/ipDsAzkVVkvIowUhwWqOMSsuVO0+p7UEQo+WBllPJZueaQySSjjp6ClSJ88k4NTx24HUVMqLsK/iKgl2jJI7Vm3GT0HFZV0h5wKpwyPbXCSpkFTkVrXety/u3tyOOoNdHp2rreWsbKcMeGXPQ1fVg+8O2VA4xUEKvHNnfuU9j0qWOZo2lLgYPfFQLOdxIPPpViOZX4zinyMD93mq7Dtj8PWqzqM9D71GwDDjOapXCdsYqm8atwwBFQWN5NZqYra7urdSScQzFVP1XIzWDPHKfnkDfvGJ59ev9aSFpLdw8bEEV0+nXqXkQzxIOCKtEjJBAzUTMoNRMynrULkAcVBOcrz1rPmyp3LSJKCMHn2prKQdy8jvTkYBSTjNNdcrk8elQMSpwa+4804GnA0oNFKKWjNeZ/F3RmbydWiUkACOb29D/SvJ3dSf51Uu1Mo2Q9fXPAqCCyjtAXLeZKerHoPpUj4CYxkn+dKYgi4LKWPbvTo1YnG0gCrKxhVB+9nmpMfpTGGeAagaEuOnI96je1Y9VODVG4tmXJMZ/Kse7DKeYyPqKj0mNbnVIInQFWJBHtiu3h0uytk3xR7ZAB0PWonk2lwBj3pXlyq47d6fMyq2AQQcHNRuVPQ800OehOPWnwyFcnNTBwwBPAz09KJRwT+VVXZc8daqzYOaozHCk1kXAzFJjPyLk89Pw/Gs2P76g54q3Ig2jjtRZytbXKuOB0P0roZGPDZ4PFQnHrTDnvmopGxULOOc1WkOSRVSVSpyKEl7HrUnmA84FIzqfWo2II56V9wZpc0oNOzRmnA0uaM1S1uyGpaRd2Zx++jKjPY9q+cdV06Wzv5rW4jMc8R2uPT3qg74zHEML3PrTtmRjpimeWzkEHAHNTW1sS27kkdqe+QW3jDflRuA/ChZRvHU4p25Q33f0qNnVSSAT9aiZ0PO1/zqCRxnjdj3qGQqcct7io44IlmSQbwwbIYf/qrofPjaHLEYNUJWEqsOnPWhQAgVTkZwDUrRKzgMxP8qBBgA5pGgzwen1qJIzk4NSc4xSFuvUgVBJ1z+RNVJHwxz0pg+eJwQNvU84J59e1Y0xlNs8qSHDzBAHIYHAz1/L86oDzDKN+MhQBgdutWCDt5qF1rXs5fMtNp6gU0y5HOKY0/vULy0wNnmoZDz+NMOCMGq8iYORTQ2OtBNIWr7izSg04GlBpc0oNOzS0Zrw34z3iJ4n8uOHZJ5Sh37v71xWEt4AzHluaj092nkk/uDgVdjX90ecdRR5piUIvXqTRIfMiVm65xkCq7gt26dalRdgViPw96XcM5PGfUdqa8kSE5I6e1NjnhfdwcY9BUEjKGIA49COlEYMj7UXtn8KknZYVCfLvYc5qkZTtUHGM8DNOV2KsFGSanAZUG7jnoTyKsRtzweM1cjIyCTTmC9aruuG61Fx7Ux++KgkC4NUpT8xBPFQnm2uMAnCZ47cisufyV022je5C7g8+1UOS+doU846AnPvVJAPNk2sHAbCsO47VKxwKjJqzZSbUaml8gj3qMtjpUbNSeb2zTXbP5U0tRn1qN19KjORSE19x5pQacDS5pQaUGlFLmnD61geLvC9j4ksGiuY1Fyo/czgfMh+vp7V83+L4J9P1OSyuVMckR2kHj8R7Vb05VjsYx3cAipdjfaNhPQ024wjBh3/nTWkO1FUn5eTUbOOnTn1pr3G0MpBIP6VXeaRztUfN7VMlrsG6U5z0XNWfs6iMOuQaRhHKvyAbv5VBc3sNinJG70x1rnob2bUdTuJlIQDCqo9On+TWskOEG5uaWPMbcetW1WS4BOeBzVuNERASQOO9PVhu9F9TxUzgbc5HFV3Zc9Rn3qM46ZAphRnztGf0qtNG6Akjj25qhI6nIPBNQXcTxWkrA5DJyKyL513WsQL7EiQfvCCAScnHtk0wFAz7BhSxIx9aazcVHuqWJiIyegJ4phk5NMZyaZvpFanE0maTNBamkg00ivuDNLmlzSg0uadmlBpQaXNOBrG8QeGtI8QRhdWsYpyOj4ww/Ec14p428Ptomuta20bLZcGDnPy4HFZMrLHkggtis2eViFbrk4qWEnbu5Ge9Vy+CRUane3POTitCwRVVpPlLAZGagnukAYljuqOzkuLpyEGIx1btVx2jhtWSMYcnGff1+lcdrdyvnOEOSeB/U1P4XiIS5cLxwoP0radisYOBnpmmbjyeM561OksmwYKg1LCJHmDyqSqjAz0omlYTqpP4UuqXTwW6hThnOAf51Bp0gL4Jz6k1eklUdeajLnPXilEmKjPlsclEJ9cVHJGkiskiqUbgj1qjLptoy/JEqHnnGeoxWe2iMF/dTgkdnGKiTR5if30ioPbk0jaWufllb8qiuLGZU+TDgHoOKoFWU/MrA+4pEYBiSPpmrD3jSW5hmVXX+EleVPsf6VSAPoaUnkfSkJ4puT2p6xuw4U49aGicdqPLfHTFfbWadmlFOzRmlzTgaUGnA0uaXNZniDSIdYsJIJAFcrhHxkqexrxTxR4E1bR7CfULm5tnhjIBWLO45OM1xgkQbSN2O9TvcA2/GPQVSaQsT2pRIsa8nrUTagykhD7fWlt0+0P5svEQ6k9/atiwuFfzPKO1EGBgVk+IdRituIjukYYCg/drkEEl1cADLyOa7WztPsdgIySWxz9ailbEQzn9KYnzEjjr3qc44IwMVK100SjDcDtVa2lae93P0FTauN0Af+7TdOUrbhjnLcmnmXMn0qRGzx1FDMR+NND8+tIrfWkzzQ8gVeKgdy+B2poQDk8VExOeuaQoXXJH41GbdW+8q00W8YzhV4qIjDc9KR4o3HzorfhVcWkCtnYfoTTZSqjCqAPakT7gpkgHWmEAV9nZpQaUGnZpc0ZpwNLSg07NLQelcn8SGH/CJXityHwv614C0MsZdVAYDpmqcryk4ZTgce1RNKFwSWHtVaWVXGBnFRwmOJsuN31NW7nVEliESII0XoFNU1u3WHYu/BPbgVnyWkssmSDlulb+kacunxea/M7D/AL5FXg5ZW5zwaqTHgcUkRyce9T/dBI5qtMTzjpT9OU72PcCrtwvnwBPXrTchE2jj056VVQ5kYjketShsL6Um8560ityKk3fQU1m29ahdsng5FIpUcDrT2U4GG/OmlT3C8UySRl/hBFQNID1GDSAqCSDUTtj6UiNkcVDM+O9VSST1p64CfgKjduaYxFfZ2aWlBpc04HigU4GnClzRmlzTs1ynxHTd4YlH/TRf51489qGDFTwRmq5sVYDf3FUpdOjOd6ggVXOiwEEjeo9jmsu/0hkhZ45CSBnB9Ky47aTzvLcEOOxroVswlpGFRfMIJJPWlihjt8u5DSfoPpTHn3nBPA7VJFhkOcc/nVW7bHAwDRa88HH41ZdgsZ46d6rOMpuNPsDtVzzVgsdoxUErFVz3psIBBJ6mn4Ix3puacmRTpWC9MVWdiaTv3p0Yy3NE0g3fSoC5ZsCiViAMVF5mB0psjAx7sYJqrknjNWEG1OaqztkmoAeafk7fwFRscUxmr7ODU6nA8UZpwNKKdmlzSg0Zpc04dMmuU+Is0beG7iNZF8wMpCg89a8kaYpGGIBz371Cl0HAPIx2bmm7w/IbHrx1pTsz8pwD1FV7yENBKi7vmUgexqCazWWO3lbAm2AuVHfHNUL+U4BTOBWWWc9Saliz/FnAq7BwMcmqt79/nilticfSpXOUxUDHCEZ69qfAcRN2zVhM7MCknRVIB64pVVGX5eDUeCTjFOZGA6c1CWxwaaT61H/FwaUEjrim+ZtORTWKyHJNIWVOOp+tNkO4DHWq5BJ6GmzNwAKWCPuw/Oi4m7L2qk5zTAetO/wFRsc0w19nCng0uacKdmjNLmlzSg0uao6vqtvpkHmTsM9l9a4LVfGN3clktyIoz0xXMXk01yHM0rMSD1NYTTgQbWz1xUSTIYyOPUZFJFcoWHzY9R2qTz0xkkVKsyspNZDXnk6hNukISSPaPXr2rIv7sK5aHLD0I4/GnW80c0QdMe4PY08HHTvU8MmDwc4qO8554pLfipWPy5z9KgXDNg8VMRtWpbZxn04psp3SE5BFKjc8YpzSAc96Y056HmopeQD3qMN6nFNLgdgajd89KiZqbu/Gms1M3kdDQJGJxjNSxxcZfrTJpsAgYFUnbJoxx2pjcZoJ5IqImgGvs2nClFOzS5ozSg0uaXNBOBkmvJvF2pve6jKQcxqdqiucLnOBnP0oMjKPmFZjIGMinGQelVlGxgDTX+Tdj61JCu8DPBokYrHjdg9MY61jXsBYNLkZUblqbUYFNujquAyBuPpWDZzi3u2V+I3457ehrVkGCMGlifHWpJcOAajgO1z1qZiMccVCvX2FOkPYE0RSbeKcWBGRjNKDjJyaY7Hccfzpm75uaWVs8GoWPpUZJpu6mPwajJ9TSZNOCFutSqqoOSM1BLLmqzvnvTdwApN2aa54NDdTUZNJX2aCMUoNKGp2aM0oalBp2aM1U1e4FtplzMTjbGa8ZvHPmc/MaiA3c96gn3suDVAjeRIvbg/UVE6OOQMnpThGWkGeBimKNjHk+31qGdiXIJJHvUM8JMZA54PSmujHToBg/wCrGa5O/XEzYGK0LGZpLVe5Xip1k3fWplk7c800fK3bk1MCD1pmcHmmO3pSBsDrQSOvT6Um4joaPNbPTP0pfNGOmKjd9zEimFs01jTCQO9Jk+poVM89qeAq9aaZQvSoJJN3eoCaYTSBcmp44xtyTxUMuM8U0nr9aYabX2SGp26gNTg1LuoDU4GnA0uawPHErR+H5Nv8Tqp+ma8umyJCTnnkH1pmcDjt1qvcScd6x4bn7PcyITmOQ5+hq4rK5+XvT2kCIehP61QfJ5B601gCme/tUitlWByTt4NQQMZLGI/7PP8AKuW1ZP37HGM1Dpcu2UxN0bp9a2EiDDK/eproV75ppbnmnq2COeKcW5prEEjFNc8VEST0oLECm+YacHODxTAeaC3FIST0oC5PNPAC0xpAM1E8nvULNmmE0wnigKSalRCO1PlbChRVT+MZ+tIOlN70V9WLrVv/AH6nTV7dv46kGqQf3xTxqcH/AD0FPTUIGOA4q0rhgCDxTwacDShq5T4lTmHw8rL185R9etebJeqw2SDkevald1OSDVK4dQDnrWJejc5wRUUdxLGeu5feriXYblsjJoMi4zzx04pVkGME9R1qRvlxg54wTVW1DeSUAPyMc/iev5VjaxGd2cfhWGcq+R1HNb9neK8GWPPepWnjZTggmoHdSaVaC3QUbqQsD7U0tTM5pMGlOAPem80uPWlyB6UNKO1QtJk1EzUwmm5pDkmnKlSqoA6c0E1HIQe+KhPU89qQ9KaDQTXor6pcqeJDUiaxdKB+8qUa3df36cNdux/F+tS2mvXQuEyxwT616t4cu2uLUFjzittTTwaK4/4pn/im0/67r/I15HKWVmDDninxzyQ43Hcv931psl2p4ljPPdGqvIsLj5ZSp64ZT/OoWtyVXYyM2eTvH8qVreZQAI3Ydyozmq8gljJ8uOZF/wBrNQyefjfvIGcYzg/lSC4nB+9u9jzSw3U0SyBBjf1qpdzSyAhx+lZzQkmlETKDjPvTCrjuQaA8q+9SpcsvUGpRdqT83FOF1Hj7woNzGf4qBMrdGFLvHqKC/vSbqN5pCx9aTOaRiB9ajJzSGkxmnBDUgjFOAAppNRkgmo2xUfGTQ1MzSHmu5lGTTScAfSlz8oIpFY5OeasW3+vT616/4RP+iD6V06Gng0ua4/4o8+GQfSdP615FI7MAGYkKMAelKj+cIYzkbQRx165qt3IphxmmsoPamEbTwSD7U8SzA5Er59dxpxup2OWlcn3OajkuJmxufOPUCo97nrt/75FIwYnkKfqopuBnBjj/AO+aXA/uR/8AfNGxT1jj/wC+aQxR940/75oNvEc/Iv4CmG1hPVF/KmNZxddi/lUTWcfZR+VRm1jz90U02qf3eaabZfSmm2HYU0wEdM/nSeW47mkJdaYWPcUm72o3j3pfMFHm/Wjz8U3z89KQyH0pu+m7s0g60NTaK7t+ahk4IFLnEefao4ZtzYNXLY/v0z61694SP+ij6CumQ8U8GlzXI/E8/wDFMH/rsn9a8ffrUcMhSUMOoPFI5JYk0ygmmk5FMNNOR3ppNITQZAKQPluKXd05pwIp3frSbqN3pTc01qYeaaRRtprLTdtMIqNlqJkqMrTCtNK0hFNIphGKUN6076UE4FIBikNWrSwaeEyFtq5wBjJNRXNs0HJOV9a7MnioJTyKTzF8sKTyahRVjlBzgVfgIMiEetet+EG/0YfSupQ08GlBrk/iaf8AimD/ANdk/rXj7nnFNkKCBcffDnI9qYaZnmg9KYTzTCabuzTGOO9ML0wsabuOakBJFOBxTt2cdKUGl7Cg+9Nb3plB5oz2pD603tTT0qNqYRzTCKYRTCtNK0wimEUwikBIp2d2KdTW4rY027jNssbEKy8c96g1OaMx7VYMx9K6TOKhm6im+UXUEUNAdvvVm0Uo6Z9a9b8I/wDHuPpXVIadS5rlPiYf+KZP/XVK8gc1XkORxSnhRnrikakJppwaY3NMNRtmk28UwfK+TTnKkDHWminqM08CnGlNITTWYUncUUneg0w009KY1MPWmHrTTTTTDTTTCKYRTCKTpS7qQ0ZpPxr1hvD7+hqP/hHpD2Jo/wCEdmUYAbFN/sGcdjT4tEn3rkHg+leieGYGhhAYY4rolNOzSg1xnxamMHhTevUTx/jXkqSrKoZDkUDqc96RuKbnimk8U3rTT1wTTDwaacUgHYGkK0AZoxj605eBThilB5pD9aQ00+tJQTSE0hph60hNNLU3PNNNMNIaYaaaaaYaaaaRSEUlIaSvqL7Ih7U5bRMcipBaJ/dFL9ijJ+6KcLGL+6KswxCMAAVODS0Zrh/jC3/FJYHedP614lbztbSh0AI7qehrUhvYJRw2xj1Vv6GpuCOtJg4ppHWmEcGmNmmZ9aD0NJ3pe1H4UYyOlNNKD+dKBx0waQk96TOT04o70cGkIpCKYf0pppppvekPNNNNpppppDTTTGpppppKaetJSV9WjrUgFPFKKUU6gGlzS5rhfjC2PCqD1uF/ka8SYUwipI55Y/uOcehrrvB+kS+Iba8ZZlie3XcAVyG4rDF3Ex5yp6c07zlP8WRSgqTwaGXBwabgUYFKKMDFOwpAwST3zTWAA6VG3FAfHanbgaaSKMjPpSnBpSjKDkHAOCccZ9KYSPWo2x7daYWFNLD1pu5T3pFw8iqCBk45pjMASM5phcU3cD3Aq3DHZeRvmuT5n/PNV/rUPmWmSPm56HPSq+4Hpg0hUmmlGpDG3tSeU3tSGI+opPLPqKTy/evqcnoakU8U4GnA0uaUGlBpc0ZrhPjCf+KZhH/Twv8AI14uwph60gr1P4NIDb6j/tjH6V53dwbLmZQOjsP1qsQRRluxxS+bIP4zSiaTOA351NHI7KM4JpxlI6AVe8MW41fxDZafMTHHO+0svUcE9/pXpi/DSxBz9uuf++VpT8NLA9b26/Jf8KYfhlp//P8AXf5L/hXG+P8Aww3hpYJ7Z3ntZDtLOOVb8K4s3zj+EU5NSlTG0Lwc/jSS6jLK7O4UsxyTR/aL7QPLj+pFB1O4Nv5O791u3be2fWoTdSE9R+VIbmX+8PyphmkJ+9R5r/3jSGRj/EajZmz1NIST1NNNAooqaA5BB7VKDt69KdvXFMaQDoKYZDTdxNFGDX1GScU5DTwacDSg07NANLmjNcL8XufDkH/Xwv8AI1424qM0lesfBoYtrn3NcRqsP/E0vABx5zj/AMerPkh5IqBosflUTIRSBTmrNuMLginlMqa2fh9Hu8caVx912b8lNe954ozSZrN8Q6VBrelTWVyPkkHB7qexr5y1vTZ9J1KezuVIkjbGf7w7EVQpM0UlKKWkNGaWkIzTKMUUmKKVDtOafvz2owx6ClEbHrTxEaXYB1NHHYUjHHU19P8AalU1IDxS0Zpc0oNLmjNcP8XOfDsH/XwP5GvHnFREUlesfB/i1n9xWZ42042niO4YLiOf96uOnPX9a5hosHJqJoT2FQtBu7daiNuRmrEcDKo5B4/KnbDt6V0HwzhLeM7d8Z8uKRifwx/WvaCeKaWozSE1y3jfwpb+I7XcCIr2MHy5MdfY+1eD6jZz6fdy211GY5ozhgaq0UUClpKD0oFOpuOaKQ0N0pooq2gXaCT1oLoO+aQzE/dX86Mu3U0YC8k0wv8A3ajJr6hBpQaeDTs0uaM0uaXNGa4r4r8+HYf+u6/yNePsKjPWm16t8JOLeb/dFbfxB01rvTo7qFcyWxJbH909a83lKsCpByOc1GAGHHOeaQRhskelRSxZcHBwOtTRovlqT1xSSRARkng11nwqtT/aN9dFeEjEYPuTn+Qr0vNNzRmkzRmub8XeFrLxFbnzAI7tR+7mUcj2PqK8P1/Q73Q7w299EV/uOPuuPUGsyiigUEUUUoooNIaTjvTSMUVJGNwx6VKI6dhVGSRTTJn7g49TTMc5PJoPFNx619OhsUobmnA04GlzS5ozTs0Zrjfinz4cj9p1/ka8hcVGRSBa9R+FJwkq/wCwK9EOGBBGQeCD3rgPEfhN4JWudMDSQnlohyU+nqK42WEgkMvP61G5xjBYEUwSSb1ywI+nf3qzA0rqodkYnn7tMuHO/YSPwFep+C9NOm6KgkXbNMfMcHtnoPyrezSE0m6jdTdw9RSFh6iqGr6bZ6vZtbX0Syxnp6qfUHtXkXi7wHdaQkl1YubqzXk8fOg9x3HvXE0Uvail9KSgUvUGikNHemt1pO1SQsFbnvUjSk8KPxpoQk5Ykmn7cUjHsKbjHXrTTX01mgGng0oNKGpc0oNOzRmuR+J/Phoe06/1ryFhTCKAK9K+FrYeUf7Ar0UGjNZmp6Hp+pc3EAEn/PRPlauT1TwW0WXtbuMqOQs3yn865K8sZLdmVypI7qwYfpUCStDkKOvqOlTWEggu0uJkEhQ7lRuhPvXRP4y1Jjw0aj6VXk8Wao3/AC2AHsKqyeJtUb/l6aq8mv6kw5upPzqBtbvz1u5f++qhbW70f8vUv/fVRnXr4dLmX/vqm/8ACQaiOl3L+dNbxBqDAg3chB9TWFeoj7pBhWPJwODVCgGnUUhFA460qmlFHWkpGGeaaKBVkYFBam7iTgUDikNMdgo5619LE05TTs0oNLmnZpQaUNzS7q5L4mnPhr/tsn9a8kamUoFei/C0/PceyCvRd1V7y9gs4TJcSBFHrXF6v44IJSwjA/22rkr7XLu8cmadzntnis9rlj3NNEzHvQZD60vmHFBc1GZMVG8+BzVdpyfamGTNNLe9JuppYVXuXyoFVgaKKUHignikoBpw6milNMNJRUiN8tL1+lKOKKY7heByahJJOTX0xnmng0oalBpQ1OzS5pc0ZrlfiSc+Gz/12SvJmptOHSvQPha3727HoBXVeIteg0e3JdgZj91a8t1bXp9RmLzyMR2UdBWW1wDTfNBo8xacrrnrThIuetL5g7Gjf61DI3vVdiWNNNIaaRSYPrSMpx1qrIeTUY70UClooooHWlzS0hpEXc2M4p0kTIATyp701DzjtUlLUcknZPzqGivpbNOBpQaXNOzS7qUNS7qXNct8R+fDbf8AXVK8oNNpy9DXSeDtYi0hNSlkYbgo2j1Nc5q+rT6ndvNcOSSeB2AqkHpQ1ODe9LupQ9OLimlgaN3vQTnuaSkNNJxSbvakLUwsKryLg5FR0lFFLmjNGaSlzxS5pc0sbBXyV3KeopXkygUEkD1qIcVKD8uaid93A6Uyiiv/2Q==";


// ============================================================
// JOINSPIRE STUDIOS — CONTENT DATABASE
// ============================================================
// TO ADD A NEW VIDEO:
// 1. Add a new object to the relevant category below
// 2. Set: title, videoId (the part after youtube.com/watch?v=)
// 3. Save. The thumbnail + embed auto-generates.
// ============================================================

const PROJECTS = [
  // DOCUMENTARIES — Top 5
  { id: 1, title: "The World's Scariest Religion: Voodoo", videoId: "WWHZbsYqwjg", category: "Documentary", client: "Tayo Notes" },
  { id: 2, title: "$6.8bn Fraud: The Hunt For Nigeria's Oil Cabal", videoId: "aFUGGexWxCw", category: "Documentary", client: "Tayo Notes" },
  { id: 3, title: "He Fooled the World, Not the FBI", videoId: "Gmh5dURF7ws", category: "Documentary", client: "Tayo Notes" },
  { id: 4, title: "How West Africa Became A Terror Hotspot", videoId: "cv8FMNQycU0", category: "Documentary", client: "Tayo Notes" },
  { id: 5, title: "Why Big Companies Are Leaving Nigeria", videoId: "FELcUniD3l0", category: "Documentary", client: "Tayo Notes" },

  // VLOGS — Top 5
  { id: 10, title: "24 Hours in NYC with Africa's BIGGEST Travel Creator", videoId: "LQH7vi5CIW0", category: "Vlog", client: "" },
  { id: 11, title: "How DreaKnowsBest Monetizes her 6M TikTok Followers", videoId: "X1hCwnxEnpA", category: "Vlog", client: "" },
  { id: 12, title: "Is This $3,000/Month Jersey City Apartment Worth It?", videoId: "0sGeHuICvhw", category: "Vlog", client: "" },
  { id: 13, title: "How YouTube Saved My Life with 500 Subscribers", videoId: "9BO89LauHPg", category: "Vlog", client: "" },
  { id: 14, title: "My Luxury Jersey City Apartment & Home Office Tour", videoId: "-Tj1MoRzvpU", category: "Vlog", client: "" },

  // EDUCATIONAL — Top 5
  { id: 20, title: "give me 15 minutes, you'll get ahead of 98.8% of people", videoId: "TmwZAzrXOxU", category: "Educational", client: "" },
  { id: 21, title: "10 Things I Stopped Buying (Financial Minimalism)", videoId: "9Gf3yK7a3PI", category: "Educational", client: "" },
  { id: 22, title: "The EASIEST Portfolio To Build Wealth (ONLY 2 Funds)", videoId: "CodrmrUFqtU", category: "Educational", client: "" },
  { id: 23, title: "7 Signs Someone is Secretly Wealthy", videoId: "SnX_GHgiwu0", category: "Educational", client: "" },
  { id: 24, title: "WORST Foods That Feed CANCER Cells", videoId: "I6ss5y1WBSc", category: "Educational", client: "" },

  // PODCAST — Top 5
  { id: 30, title: "How 40 People Built a $1.25B AI Unicorn to $50M ARR in 5 Months", videoId: "CR7kxeuAPNs", category: "Podcast", client: "CLIMB by VSC" },
  { id: 31, title: "The Pig Butchering Scam: How AI Supercharges Every Attack Vector", videoId: "B4gp-33hKXo", category: "Podcast", client: "CLIMB by VSC" },
  { id: 32, title: "$500K Per Hour: The Cost When Data Centers Go Down", videoId: "YRcLxn0Cdt4", category: "Podcast", client: "CLIMB by VSC" },
  { id: 33, title: "Humanoid Hype Will Bankrupt Investors", videoId: "_1BnZTkLGLM", category: "Podcast", client: "CLIMB by VSC" },
  { id: 34, title: "81,000 Electricians Needed Per Year", videoId: "xRSdHS6CJKQ", category: "Podcast", client: "CLIMB by VSC" },
];

const CATEGORIES = ["All", "Documentary", "Podcast", "Vlog", "Educational"];

const CREATORS = [
  { name: "Tayo Notes", role: "Documentary" },
  { name: "CLIMB by VSC", role: "Podcast" },
  { name: "Profff TV", role: "Challenge / Vlog" },
  { name: "Jude Bela", role: "Storytelling" },
  { name: "Leo Kim", role: "Broadcast Identity" },
  // Add more creators here
];

const TESTIMONIALS = [
  {
    name: "Jude Bela",
    handle: "198K subscribers",
    quote: "He is highly dedicated to the task and understands how to tell a story with editing. He is a team player and fun to be with. His creativity brings the stories to life.",
  },
  {
    name: "Tayo Notes",
    handle: "2.21K subscribers",
    quote: "A great video editor, illustrator and animator. He goes above and beyond to support projects with full commitment to the channel's excellence. I will gladly recommend him anytime because you will be getting more than a video editor.",
  },
];

const PRICING = [
  { tier: "Video Editing", desc: "Long-form YouTube, challenge videos, vlogs. Multi-camera, retention-optimized.", includes: ["Editing & color grading", "Sound design", "Lower thirds & graphics", "Revisions included"] },
  { tier: "Animation", desc: "2D motion graphics, animated maps, infographic sequences, or full 3D character pipelines.", includes: ["2D or 3D animation", "Character design & rigging", "Storyboarding", "Cinematic rendering"] },
  { tier: "Documentary", desc: "End-to-end production — research, scripting, reenactment direction, animated sequences.", includes: ["Research & scripting", "Direction & production", "Animation & VFX", "Full post-production"] },
  { tier: "Podcast Production", desc: "Full post-production — from raw recording to publish-ready episodes with short-form clips.", includes: ["Editing & sound design", "Visual overlays & text", "Short-form clips", "B-roll integration"], popular: true },
];

const S = {
  name: "Joinspire Studios",
  founder: "Joseph",
  title: "Founder & Lead Creative",
  email: "hello@joinspire.com",
  bookCall: "#", // Your Calendly URL
  showreelId: "jp8wjXI2TUI",
  location: "Lagos, Nigeria",
  socials: [
    { label: "YouTube", url: "#" },
    { label: "Instagram", url: "#" },
    { label: "X", url: "#" },
  ],
};

// ============================================================
// THEME
// ============================================================
function ThemeWrap({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? "t-dark" : "t-light"}>
      {children}
      <button className="t-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
        <div className="t-track">
          <div className={`t-thumb ${dark ? "t-thumb--on" : ""}`}>
            {dark ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

// ============================================================
// GRAIN OVERLAY
// ============================================================
function Grain() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "256px 256px",
    }} />
  );
}

// ============================================================
// NAV
// ============================================================
function Nav() {
  const [s, setS] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => { const f = () => setS(window.scrollY > 60); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMob(false); };
  return (
    <>
      <nav className={`nav ${s ? "nav--s" : ""}`}>
        <button className="logo" onClick={() => go("hero")}>Joinspire<span className="dot">.</span></button>
        <div className="nav-r desk">
          <button onClick={() => go("work")}>Work</button>
          <button onClick={() => go("pricing")}>Pricing</button>
          <button onClick={() => go("about")}>About</button>
          <a href={S.bookCall} className="nav-cta" target="_blank" rel="noopener noreferrer">Book a Call</a>
        </div>
        <button className="burger mob" onClick={() => setMob(!mob)}>
          <span style={{ transform: mob ? "rotate(45deg) translate(4px,4px)" : "" }} />
          <span style={{ opacity: mob ? 0 : 1 }} />
          <span style={{ transform: mob ? "rotate(-45deg) translate(5px,-5px)" : "" }} />
        </button>
      </nav>
      {mob && <div className="mob-menu">
        <button onClick={() => go("work")}>Work</button>
        <button onClick={() => go("pricing")}>Pricing</button>
        <button onClick={() => go("about")}>About</button>
        <button onClick={() => go("contact")}>Book a Call</button>
      </div>}
    </>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);
  return (
    <section id="hero" className="hero">
      <div className={`hero-c ${v ? "hero-c--in" : ""}`}>
        <p className="hero-over">{S.name}</p>
        <h1 className="hero-h1">We make the things you<br/><em>can't stop watching.</em></h1>
        <p className="hero-sub">A creative studio for video creators and storytellers who need more than just an editor. Documentary, podcast, animation, and everything between.</p>
        <div className="hero-acts">
          <button className="btn btn--dark" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>See Our Work</button>
          <a href={S.bookCall} className="btn btn--out" target="_blank" rel="noopener noreferrer">Book a Call →</a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SHOWREEL
// ============================================================
function Showreel() {
  const [muted, setMuted] = useState(true);
  const ref = useRef(null);
  const toggle = () => {
    const n = !muted; setMuted(n);
    ref.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: n ? "mute" : "unMute" }), "*");
  };
  return (
    <section className="reel">
      <div className="reel-frame">
        <iframe ref={ref} src={`https://www.youtube.com/embed/${S.showreelId}?autoplay=1&mute=1&loop=1&playlist=${S.showreelId}&controls=0&showinfo=0&rel=0&enablejsapi=1&modestbranding=1`} title="Showreel" allow="autoplay; encrypted-media" allowFullScreen className="reel-iframe" />
        <button className="snd-btn" onClick={toggle}>
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          )}
        </button>
        <span className="reel-tag">Showreel · 2025</span>
      </div>
    </section>
  );
}

// ============================================================
// VIDEO CARD with image fallback
// ============================================================
function VCard({ project, onPlay }) {
  const [hover, setHover] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const thumb = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;

  // Category color for fallback
  const catColors = { Documentary: "#2A2A2A", Podcast: "#1E1E2E", Vlog: "#2E2A1E", Educational: "#1E2E2A" };

  return (
    <div className={`vc ${hover ? "vc--h" : ""}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => onPlay(project)}>
      <div className="vc-thumb">
        {!imgErr ? (
          <img src={thumb} alt={project.title} loading="lazy" onError={() => setImgErr(true)} />
        ) : (
          <div className="vc-fallback" style={{ background: catColors[project.category] || "#222" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"><polygon points="6,3 20,12 6,21" /></svg>
            <span className="vc-fb-title">{project.title}</span>
          </div>
        )}
        <div className="vc-over">
          <div className="vc-play"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21" /></svg></div>
        </div>
        <span className="vc-cat">{project.category}</span>
      </div>
      <div className="vc-info">
        <h3 className="vc-title">{project.title}</h3>
        {project.client && <span className="vc-client">{project.client}</span>}
      </div>
    </div>
  );
}

// ============================================================
// LIGHTBOX
// ============================================================
function Lightbox({ project, onClose }) {
  useEffect(() => { const f = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", f); document.body.style.overflow = "hidden"; return () => { window.removeEventListener("keydown", f); document.body.style.overflow = ""; }; }, [onClose]);
  if (!project) return null;
  return (
    <div className="lb" onClick={onClose}>
      <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
        <button className="lb-x" onClick={onClose}>×</button>
        <div className="lb-vid"><iframe src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0`} title={project.title} allow="autoplay; encrypted-media; fullscreen" allowFullScreen /></div>
        <div className="lb-meta"><h3>{project.title}</h3><span>{project.category}{project.client ? ` · ${project.client}` : ""}</span></div>
      </div>
    </div>
  );
}

// ============================================================
// WORK
// ============================================================
function Work() {
  const [filter, setFilter] = useState("All");
  const [lbp, setLbp] = useState(null);
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  return (
    <section id="work" className="work">
      <div className="sec-head">
        <p className="sec-label">Selected Work</p>
        <h2 className="sec-title">Recent projects.</h2>
      </div>
      <div className="filters">
        {CATEGORIES.map(c => (
          <button key={c} className={`fbtn ${filter === c ? "fbtn--on" : ""}`} onClick={() => setFilter(c)}>
            {c} <span className="fcount">{c === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === c).length}</span>
          </button>
        ))}
      </div>
      <div className="wgrid">{filtered.map(p => <VCard key={p.id} project={p} onPlay={setLbp} />)}</div>
      {lbp && <Lightbox project={lbp} onClose={() => setLbp(null)} />}
    </section>
  );
}

// ============================================================
// CREATORS
// ============================================================
function Creators() {
  return (
    <section className="creators">
      <div className="sec-head">
        <p className="sec-label">Collaborators</p>
        <h2 className="sec-title">Creators we've worked with.</h2>
      </div>
      <div className="cr-grid">
        {CREATORS.map((c, i) => (
          <div key={i} className="cr-card">
            <div className="cr-avatar">{c.name.charAt(0)}</div>
            <div className="cr-info">
              <span className="cr-name">{c.name}</span>
              <span className="cr-role">{c.role}</span>
            </div>
          </div>
        ))}
        {/* Placeholder for adding more */}
        <div className="cr-card cr-card--add">
          <div className="cr-avatar cr-avatar--add">+</div>
          <div className="cr-info">
            <span className="cr-name" style={{ opacity: 0.4 }}>Add more creators</span>
            <span className="cr-role">in the CREATORS array</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS
// ============================================================
function Reviews() {
  return (
    <section className="reviews">
      <div className="sec-head">
        <p className="sec-label">What They Say</p>
        <h2 className="sec-title">Client reviews.</h2>
      </div>
      <div className="rev-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="rev-card">
            <div className="rev-quote">"</div>
            <p className="rev-text">{t.quote}</p>
            <div className="rev-author">
              <div className="rev-av">{t.name.charAt(0)}</div>
              <div className="rev-info">
                <span className="rev-name">{t.name}</span>
                <span className="rev-handle">{t.handle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// PRICING
// ============================================================
function PricingSection() {
  return (
    <section id="pricing" className="pricing">
      <div className="sec-head">
        <p className="sec-label">Services & Pricing</p>
        <h2 className="sec-title">What we do.</h2>
      </div>
      <div className="pr-grid">
        {PRICING.map((p, i) => (
          <div key={i} className={`pr-card ${p.popular ? "pr-card--pop" : ""}`}>
            {p.popular && <span className="pr-badge">Most Requested</span>}
            <h3 className="pr-tier">{p.tier}</h3>
            <p className="pr-desc">{p.desc}</p>
            <div className="pr-div" />
            <ul className="pr-list">{p.includes.map((x, j) => <li key={j}><span className="pr-ck">✓</span>{x}</li>)}</ul>
            <a href={S.bookCall} className="btn btn--dark pr-cta" target="_blank" rel="noopener noreferrer">Get a Quote</a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ABOUT — Tony&Co / Agio style bio
// ============================================================
function About() {
  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div className="about-text">
          <p className="sec-label">About</p>

          <h2 className="about-headline">
            We are a creative production house for video creators and storytellers who need more than just an editor.
          </h2>

          <div className="about-body">
            <p>
              Joinspire Studios started with documentaries — researching, scripting, and building animated visual systems for investigative stories across Nigeria and West Africa. That work taught us something: the difference between content people scroll past and content they can't stop watching is almost never about the footage. It's about structure, pacing, and visual intelligence.
            </p>
            <p>
              That principle now drives everything we do. From podcast post-production built on the Diary of a CEO framework, to 3D character animation pipelines in Blender, to broadcast identity systems — every project gets the same obsessive attention to detail. The map textures in a historical explainer matter as much as the lower-third timing in a podcast clip.
            </p>
            <p>
              We've produced content across documentary, podcast, educational, and lifestyle formats, working with creators from Lagos to New York. Our job is simple: to make your story look and feel like nothing else out there.
            </p>
          </div>

          <div className="about-founder">
            <div className="af-photo"><img src={FOUNDER_PHOTO} alt="Joseph" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",filter:"grayscale(100%)"}} /></div>
            <div className="af-info">
              <span className="af-name">{S.founder}</span>
              <span className="af-title">{S.title}</span>
              <span className="af-loc">{S.location}</span>
            </div>
          </div>
        </div>

        <div className="about-services">
          <span className="as-label">Services</span>
          <div className="as-line" />
          <div className="as-list">
            {["Video Editing", "2D Animation", "3D Animation", "Documentary Production", "Podcast Production", "Motion Graphics", "Broadcast Design"].map(s => (
              <span key={s} className="as-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <p className="sec-label sec-label--c">Let's Work Together</p>
        <h2 className="ct-h2">Got a story to tell?</h2>
        <p className="ct-sub">Whether it's a documentary, podcast, animation, or challenge video — we'll make it look like nothing you've seen before.</p>
        <div className="ct-acts">
          <a href={S.bookCall} className="btn btn--dark btn--lg" target="_blank" rel="noopener noreferrer">Book a Call</a>
          <a href={`mailto:${S.email}`} className="btn btn--out btn--lg">{S.email}</a>
        </div>
        <div className="ct-soc">{S.socials.map(s => <a key={s.label} href={s.url} className="slink">{s.label}</a>)}</div>
      </div>
      <footer className="foot">
        <span className="foot-logo">Joinspire<span className="dot">.</span></span>
        <span className="foot-cp">© {new Date().getFullYear()} Joinspire Studios</span>
        <span className="foot-loc">{S.location}</span>
      </footer>
    </section>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  return (
    <ThemeWrap>
      <style>{`


/* ===== THEME ===== */
.t-light {
  --bg:#F7F6F3; --bg2:#FFFFFF; --fg:#1A1A1A; --fg2:#666; --fg3:#999; --fg4:#CCC;
  --brd:rgba(0,0,0,0.08); --brd2:rgba(0,0,0,0.14);
  --accent:#1A1A1A; --accent-soft:rgba(0,0,0,0.04);
  --card-sh:0 1px 2px rgba(0,0,0,0.04),0 4px 12px rgba(0,0,0,0.02);
  --nav-bg:rgba(247,246,243,0.92); --overlay:rgba(0,0,0,0.85);
}
.t-dark {
  --bg:#0A0A0A; --bg2:#141414; --fg:#FFFFFF; --fg2:rgba(255,255,255,0.55); --fg3:rgba(255,255,255,0.3); --fg4:rgba(255,255,255,0.1);
  --brd:rgba(255,255,255,0.06); --brd2:rgba(255,255,255,0.12);
  --accent:#FFFFFF; --accent-soft:rgba(255,255,255,0.04);
  --card-sh:0 1px 3px rgba(0,0,0,0.3);
  --nav-bg:rgba(10,10,10,0.92); --overlay:rgba(0,0,0,0.92);
}

*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--fg);font-family:'DM Sans',sans-serif;overflow-x:hidden}
.t-light,.t-dark{background:var(--bg);min-height:100vh;transition:background 0.4s,color 0.4s}
::selection{background:rgba(0,0,0,0.12)}
.t-dark ::selection{background:rgba(255,255,255,0.15)}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--fg3)}
.dot{opacity:0.25} em{font-style:italic}
a{color:inherit}

/* TOGGLE */
.t-toggle{position:fixed;bottom:24px;right:24px;z-index:1001;background:var(--bg2);border:1px solid var(--brd2);border-radius:20px;padding:3px;cursor:pointer;box-shadow:var(--card-sh);transition:all 0.3s}
.t-toggle:hover{border-color:var(--fg3)}
.t-track{width:40px;height:22px;border-radius:11px;background:var(--brd);position:relative;transition:background 0.3s}
.t-thumb{position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:var(--fg);color:var(--bg);display:flex;align-items:center;justify-content:center;transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}
.t-thumb--on{left:20px}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:22px 40px;display:flex;justify-content:space-between;align-items:center;transition:all 0.5s cubic-bezier(0.16,1,0.3,1)}
.nav--s{padding:14px 40px;background:var(--nav-bg);backdrop-filter:blur(20px);border-bottom:1px solid var(--brd)}
.logo{font-family:'Fraunces',serif;font-size:18px;font-weight:900;color:var(--fg);background:none;border:none;cursor:pointer;letter-spacing:-0.5px}
.nav-r{display:flex;gap:28px;align-items:center}
.nav-r button{background:none;border:none;color:var(--fg3);font-family:'DM Sans';font-size:12px;font-weight:500;letter-spacing:1.2px;text-transform:uppercase;cursor:pointer;transition:color 0.3s}
.nav-r button:hover{color:var(--fg)}
.nav-cta{background:var(--fg)!important;color:var(--bg)!important;padding:10px 22px!important;font-family:'DM Sans'!important;font-size:12px!important;font-weight:600!important;letter-spacing:1px!important;text-transform:uppercase!important;text-decoration:none;border:none;cursor:pointer;transition:opacity 0.3s!important;display:inline-block}
.nav-cta:hover{opacity:0.8!important}
.burger{background:none;border:none;cursor:pointer;padding:6px;flex-direction:column;gap:5px}
.burger span{display:block;width:20px;height:1.5px;background:var(--fg);transition:all 0.3s}
.desk{display:flex}.mob{display:none!important}
.mob-menu{position:fixed;inset:0;background:var(--bg);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px}
.mob-menu button{background:none;border:none;font-family:'Fraunces',serif;font-size:26px;font-weight:700;color:var(--fg);cursor:pointer}
@media(max-width:700px){.desk{display:none!important}.mob{display:flex!important}.nav{padding:16px 20px}}

/* SECTION COMMON */
.sec-head{margin-bottom:36px}
.sec-label{font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--fg3);margin-bottom:10px}
.sec-label--c{text-align:center}
.sec-title{font-family:'Fraunces',serif;font-size:clamp(24px,4vw,44px);font-weight:900;line-height:1.15;color:var(--fg)}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:140px 40px 100px}
.hero-c{max-width:780px;opacity:0;transform:translateY(30px);transition:all 1s cubic-bezier(0.16,1,0.3,1)}
.hero-c--in{opacity:1;transform:translateY(0)}
.hero-over{font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--fg3);margin-bottom:20px}
.hero-h1{font-family:'Fraunces',serif;font-size:clamp(36px,6.5vw,72px);font-weight:900;line-height:1.08;color:var(--fg);margin-bottom:22px;letter-spacing:-0.5px}
.hero-h1 em{color:var(--fg)}
.hero-sub{font-size:clamp(15px,1.6vw,17px);line-height:1.7;color:var(--fg3);max-width:480px;margin-bottom:36px}
.hero-acts{display:flex;gap:12px;flex-wrap:wrap}
.btn{font-family:'DM Sans';font-size:12px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;border:none}
.btn--dark{background:var(--fg);color:var(--bg);padding:14px 32px}
.btn--dark:hover{opacity:0.8}
.btn--out{background:transparent;color:var(--fg2);padding:14px 32px;border:1px solid var(--brd2)}
.btn--out:hover{border-color:var(--fg3);color:var(--fg)}
.btn--lg{padding:18px 40px;font-size:13px}
@media(max-width:700px){.hero{padding:120px 20px 80px}}

/* SHOWREEL */
.reel{padding:0 40px 80px}
.reel-frame{max-width:1100px;margin:0 auto;aspect-ratio:16/9;position:relative;background:var(--bg2);border:1px solid var(--brd);overflow:hidden}
.reel-iframe{width:100%;height:100%;border:none;pointer-events:none}
.snd-btn{position:absolute;bottom:16px;right:16px;z-index:3;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);color:#fff;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s}
.snd-btn:hover{background:var(--fg)}
.reel-tag{position:absolute;bottom:16px;left:16px;z-index:3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.45);background:rgba(0,0,0,0.45);backdrop-filter:blur(8px);padding:5px 12px}
@media(max-width:700px){.reel{padding:0 20px 60px}}

/* WORK */
.work{padding:0 40px 80px;max-width:1200px;margin:0 auto}
.filters{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:32px;padding-bottom:16px;border-bottom:1px solid var(--brd)}
.fbtn{background:none;border:1px solid var(--brd);color:var(--fg3);font-family:'DM Sans';font-size:12px;font-weight:500;padding:7px 16px;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:5px}
.fbtn:hover{border-color:var(--brd2);color:var(--fg2)}
.fbtn--on{background:var(--fg);border-color:var(--fg);color:var(--bg)}
.fcount{font-size:10px;opacity:0.5}
.wgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}
@media(max-width:700px){.work{padding:0 20px 60px}.wgrid{grid-template-columns:1fr}}

/* VIDEO CARD */
.vc{cursor:pointer;border:1px solid var(--brd);background:var(--bg2);transition:all 0.35s cubic-bezier(0.16,1,0.3,1);overflow:hidden}
.vc--h{border-color:var(--brd2);transform:translateY(-2px);box-shadow:var(--card-sh)}
.vc-thumb{position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--accent-soft)}
.vc-thumb img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s cubic-bezier(0.16,1,0.3,1)}
.vc--h .vc-thumb img{transform:scale(1.03)}
.vc-fallback{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:20px}
.vc-fb-title{font-size:13px;color:rgba(255,255,255,0.4);text-align:center;line-height:1.4;max-width:80%}
.vc-over{position:absolute;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s}
.vc--h .vc-over{opacity:1}
.vc-play{width:44px;height:44px;border-radius:50%;background:var(--fg);display:flex;align-items:center;justify-content:center;transform:scale(0.85);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1)}
.vc--h .vc-play{transform:scale(1)}
.vc-cat{position:absolute;top:10px;left:10px;font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#fff;background:rgba(0,0,0,0.5);backdrop-filter:blur(6px);padding:4px 10px}
.vc-info{padding:14px 16px 16px}
.vc-title{font-family:'Fraunces',serif;font-size:15px;font-weight:700;color:var(--fg);line-height:1.3;margin-bottom:3px}
.vc-client{font-size:12px;color:var(--fg3)}

/* LIGHTBOX */
.lb{position:fixed;inset:0;z-index:2000;background:var(--overlay);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px)}
.lb-inner{width:100%;max-width:860px}
.lb-x{position:absolute;top:16px;right:24px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;z-index:2001;opacity:0.5;transition:opacity 0.3s}
.lb-x:hover{opacity:1}
.lb-vid{aspect-ratio:16/9;width:100%;background:#000}
.lb-vid iframe{width:100%;height:100%;border:none}
.lb-meta{padding:14px 0 0}
.lb-meta h3{font-family:'Fraunces',serif;font-size:18px;font-weight:700;color:#fff;margin-bottom:3px}
.lb-meta span{font-size:13px;color:rgba(255,255,255,0.35)}

/* CREATORS */
.creators{padding:0 40px 80px;max-width:1200px;margin:0 auto}
.cr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.cr-card{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1px solid var(--brd);background:var(--bg2);transition:all 0.3s}
.cr-card:hover{border-color:var(--brd2)}
.cr-card--add{border-style:dashed;opacity:0.5}
.cr-avatar{width:40px;height:40px;border-radius:50%;background:var(--accent-soft);border:1px solid var(--brd);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:16px;font-weight:800;color:var(--fg2);flex-shrink:0}
.cr-avatar--add{font-size:20px;font-weight:400}
.cr-name{font-family:'Fraunces',serif;font-size:14px;font-weight:700;color:var(--fg);display:block;line-height:1.2}
.cr-role{font-size:11px;color:var(--fg3);letter-spacing:0.5px}
@media(max-width:700px){.creators{padding:0 20px 60px}}

/* REVIEWS */
.reviews{padding:0 40px 80px;max-width:1200px;margin:0 auto}
.rev-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px}
.rev-card{background:var(--bg2);border:1px solid var(--brd);padding:28px 24px 24px;position:relative}
.rev-quote{font-family:'Fraunces',serif;font-size:48px;font-weight:900;color:var(--fg4);line-height:1;margin-bottom:4px;position:absolute;top:16px;left:20px}
.rev-text{font-size:15px;line-height:1.7;color:var(--fg2);margin-bottom:20px;padding-top:28px}
.rev-author{display:flex;align-items:center;gap:12px}
.rev-av{width:36px;height:36px;border-radius:50%;background:var(--accent-soft);border:1px solid var(--brd);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:14px;font-weight:800;color:var(--fg2);flex-shrink:0}
.rev-name{font-family:'Fraunces',serif;font-size:14px;font-weight:700;color:var(--fg);display:block;line-height:1.2}
.rev-handle{font-size:11px;color:var(--fg3)}
@media(max-width:700px){.reviews{padding:0 20px 60px}.rev-grid{grid-template-columns:1fr}}

/* PRICING */
.pricing{padding:80px 40px;max-width:1200px;margin:0 auto;border-top:1px solid var(--brd)}
.pr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.pr-card{background:var(--bg2);border:1px solid var(--brd);padding:28px 24px;display:flex;flex-direction:column;position:relative;transition:all 0.3s}
.pr-card:hover{border-color:var(--brd2)}
.pr-card--pop{border-color:var(--fg3)}
.pr-badge{position:absolute;top:-1px;right:16px;background:var(--fg);color:var(--bg);font-size:9px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:4px 10px}
.pr-tier{font-family:'Fraunces',serif;font-size:20px;font-weight:800;color:var(--fg);margin-bottom:8px}
.pr-desc{font-size:13px;line-height:1.6;color:var(--fg3);margin-bottom:18px}
.pr-div{width:100%;height:1px;background:var(--brd);margin-bottom:18px}
.pr-list{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:24px;flex:1}
.pr-list li{font-size:13px;color:var(--fg2);display:flex;align-items:center;gap:7px}
.pr-ck{font-weight:700;font-size:13px}
.pr-cta{width:100%;text-align:center}
@media(max-width:700px){.pricing{padding:60px 20px}}

/* ABOUT */
.about{padding:80px 40px;border-top:1px solid var(--brd)}
.about-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1.6fr 1fr;gap:80px;align-items:start}
.about-headline{font-family:'Fraunces',serif;font-size:clamp(22px,3.5vw,36px);font-weight:900;line-height:1.2;color:var(--fg);margin-bottom:28px;max-width:600px}
.about-body{display:flex;flex-direction:column;gap:16px;margin-bottom:36px}
.about-body p{font-size:15px;line-height:1.75;color:var(--fg3);margin:0}
.about-founder{display:flex;align-items:center;gap:16px;padding:20px;border:1px solid var(--brd);background:var(--bg2)}
.af-photo{width:56px;height:56px;border-radius:50%;background:var(--accent-soft);border:1px solid var(--brd);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.af-photo span{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--fg4)}
.af-name{font-family:'Fraunces',serif;font-size:16px;font-weight:800;color:var(--fg);display:block}
.af-title{font-size:12px;color:var(--fg2);display:block}
.af-loc{font-size:11px;color:var(--fg3);display:block;margin-top:2px}
.about-services{position:sticky;top:100px}
.as-label{display:block;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--fg2);margin-bottom:12px}
.as-line{width:100%;height:1px;background:var(--brd);margin-bottom:14px}
.as-list{display:flex;flex-direction:column;gap:0}
.as-tag{font-size:14px;color:var(--fg2);padding:12px 0;border-bottom:1px solid var(--brd);transition:color 0.3s}
.as-tag:hover{color:var(--fg)}
@media(max-width:768px){.about{padding:60px 20px}.about-inner{grid-template-columns:1fr;gap:40px}.about-services{position:static}}

/* CONTACT */
.contact{padding:80px 40px 0;border-top:1px solid var(--brd)}
.contact-inner{max-width:600px;margin:0 auto;text-align:center;padding-bottom:72px}
.ct-h2{font-family:'Fraunces',serif;font-size:clamp(32px,6vw,64px);font-weight:900;color:var(--fg);line-height:1.08;margin-bottom:16px}
.ct-sub{font-size:15px;line-height:1.7;color:var(--fg3);max-width:420px;margin:0 auto 28px}
.ct-acts{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.ct-soc{display:flex;justify-content:center;gap:24px;margin-top:36px}
.slink{font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--fg3);text-decoration:none;transition:color 0.3s}
.slink:hover{color:var(--fg)}
.foot{max-width:1100px;margin:0 auto;padding:24px 0;border-top:1px solid var(--brd);display:flex;justify-content:space-between;align-items:center}
.foot-logo{font-family:'Fraunces',serif;font-size:14px;font-weight:900;color:var(--fg)}
.foot-cp,.foot-loc{font-size:11px;color:var(--fg4)}
@media(max-width:640px){.contact{padding:60px 20px 0}.foot{flex-direction:column;gap:8px;text-align:center}}
      `}</style>
      <Grain />
      <Nav />
      <Hero />
      <Showreel />
      <Work />
      <Creators />
      <Reviews />
      <PricingSection />
      <About />
      <Contact />
    </ThemeWrap>
  );
}
