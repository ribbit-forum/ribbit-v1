import Image from 'next/image'
import WalletConnect from './components/ConnectWallet'

export default function Home() {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1440px] h-[5420px] relative">
        <div className="absolute w-[1440px] h-[2253px] top-0 left-0">
          <img
            className="absolute w-[1440px] h-[821px] top-0 left-0"
            alt="Vector"
            src="https://c.animaapp.com/J4mqQRea/img/vector.svg"
          />
          <div className="flex flex-col w-[1440px] h-[2103px] items-center justify-center gap-[40px] absolute top-[150px] left-0">
            <p className="relative w-[990px] [font-family:'Lexend',Helvetica] font-bold text-[#205b45] text-[72px] text-center tracking-[0] leading-[130px]">
              Speak / Discover / Write
            </p>
            <div className="relative w-[1083px] h-[589px]">
              <div className="relative h-[589px]">
                <div className="flex w-[1083px] h-[220px] items-center justify-center gap-[10px] px-[10px] py-0 absolute top-0 left-0 bg-[#f3fffa] rounded-[20px] overflow-hidden">
                  <div className="relative w-[982px] h-[97px] [font-family:'HeliosExt-Bold',Helvetica] font-bold text-black text-[120px] text-center tracking-[0] leading-[130px] whitespace-nowrap">
                    YOUR TRUTH.
                  </div>
                </div>
                <img
                  className="absolute w-[466px] h-[400px] top-[189px] left-[226px]"
                  alt="Froggy"
                  src="https://c.animaapp.com/J4mqQRea/img/froggy.svg"
                />
                <img
                  className="absolute w-[170px] h-[84px] top-[213px] left-[679px]"
                  alt="Vector"
                  src="https://c.animaapp.com/J4mqQRea/img/vector-5.svg"
                />
              </div>
            </div>
            <div className="flex w-[1083px] h-[118px] items-center justify-center gap-[10px] px-[14px] py-[38px] relative bg-[#f0f0f0] rounded-[20px] overflow-hidden">
              <div className="relative w-fit mt-[-20.00px] mb-[-18.00px] [font-family:'Lexend',Helvetica] font-bold text-[#202c1a] text-[64px] text-center tracking-[0] leading-[normal]">
                Create, Share, Connect.
              </div>
            </div>
            <div className="relative w-[1255px] h-[827px] overflow-hidden">
              <div className="relative w-[1175px] h-[783px] top-[50px] left-[50px]">
                <div className="relative w-[1255px] h-[827px] top-[-50px] left-[-50px]">
                  <img
                    className="w-[890px] h-[721px] top-0 left-0 absolute object-cover"
                    alt="Image"
                    src="https://c.animaapp.com/J4mqQRea/img/image-37.png"
                  />
                  <img
                    className="w-[1021px] h-[737px] top-[90px] left-[234px] absolute object-cover"
                    alt="Image"
                    src="https://c.animaapp.com/J4mqQRea/img/image-38.png"
                  />
                  <img
                    className="absolute w-[1187px] h-[767px] top-[34px] left-[34px]"
                    alt="Group"
                    src="https://c.animaapp.com/J4mqQRea/img/group-34.png"
                  />
                </div>
              </div>
            </div>
            <p className="relative w-[942px] [font-family:'Lexend',Helvetica] font-normal text-[#646464] text-[48px] text-center tracking-[0] leading-[normal]">
              Explore Ribbit, the New Decentralized Home for All Your Thoughts.
            </p>
          </div>
        </div>
        <div className="absolute w-[1440px] h-[1161px] top-[4259px] left-0">
          <div className="absolute w-[1440px] top-[1011px] bg-[#205b45] h-[150px] left-0">
            <div className="absolute w-[381px] h-[75px] top-[38px] left-[50px]">
              <div className="w-[379px] h-[75px] top-0 left-0 text-[#f3fffa] text-[32px] absolute [font-family:'HeliosExt-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
                RIBBIT 2024
              </div>
            </div>
            <img
              className="absolute w-[75px] h-[75px] top-[37px] left-[1315px]"
              alt="Subtract"
              src="https://c.animaapp.com/J4mqQRea/img/subtract.svg"
            />
          </div>
          <div className="inline-flex flex-col h-[1011px] items-start justify-center gap-[50px] px-0 py-[100px] absolute top-0 left-[100px]">
            <div className="relative w-fit mt-[-14.00px] [font-family:'HeliosExt-Bold',Helvetica] font-bold text-[#205b45] text-[64px] text-center tracking-[0] leading-[normal]">
              Powered by Starknet
            </div>
            <p className="relative w-[1240px] [font-family:'Lexend',Helvetica] font-normal text-[#202c1a] text-[42px] tracking-[0] leading-[64px]">
              Explore new horizons with words that inspire and inform. Our platform has been a beacon of inspiration and
              a source of knowledge since its inception, replacing traditional methods with innovative digital
              solutions. We&#39;ve evolved continuously, keeping pace with the latest trends in digital publishing,
              ensuring that our legacy of enlightening content endures.
            </p>
            <div className="relative w-fit [font-family:'HeliosExt-Bold',Helvetica] font-bold text-[#205b45] text-[64px] text-center tracking-[0] leading-[normal]">
              Ready to Jump In?
            </div>
            <a href='/home' className="cursor-pointer flex w-[800px] items-center gap-[30px] p-[50px] relative flex-[0_0_auto] mb-[-13.00px] bg-[#202c1a] rounded-[20px] overflow-hidden shadow-[4px_4px_10px_#00000040]">
              <img
                className="relative w-[30px] h-[30px]"
                alt="Vector"
                src="https://c.animaapp.com/J4mqQRea/img/vector-1.svg"
              />
              <div className="relative w-fit mt-[-1.00px] [font-family:'Lexend',Helvetica] font-bold text-white text-[36px] tracking-[0] leading-[normal]">
                CONNECT MY WALLET
              </div>
            </a>
          </div>
          <img
            className="w-[356px] h-[356px] top-[600px] left-[970px] absolute object-cover"
            alt="Image"
            src="https://c.animaapp.com/J4mqQRea/img/image-33@2x.png"
          />
          <img
            className="absolute w-[1440px] h-[1161px] top-0 left-0"
            alt="Slice"
            src="https://c.animaapp.com/J4mqQRea/img/slice-1.png"
          />
        </div>
        <div className="absolute w-[1141px] h-[1033px] top-[6079px] left-[150px]">
          <div className="absolute w-[260px] h-[260px] top-[496px] left-[580px] bg-[#d9d9d9]" />
          <div className="absolute w-[260px] h-[260px] top-[496px] left-[20px] bg-[#d9d9d9]" />
          <div className="absolute w-[260px] h-[260px] top-[496px] left-[860px] bg-[#d9d9d9]" />
          <div className="absolute w-[1141px] h-[1033px] top-0 left-0">
            <img
              className="absolute w-[1100px] h-[1026px] top-[-4412px] left-[-8496px]"
              alt="Group"
              src="https://c.animaapp.com/J4mqQRea/img/group-19.png"
            />
            <div className="absolute w-[1141px] h-[300px] top-0 left-0 [background:linear-gradient(180deg,rgb(255,255,255)_0%,rgba(255,255,255,0)_100%)]" />
          </div>
        </div>
        <img
          className="absolute w-[1100px] h-px top-[1279px] left-[-8347px]"
          alt="Vector"
          src="https://c.animaapp.com/J4mqQRea/img/group-19.png"
        />
        <div className="absolute w-[812px] h-[310px] top-[5741px] left-[170px]">
          <div className="top-[269px] left-0 [font-family:'Helvetica-Oblique',Helvetica] text-[#909090] whitespace-nowrap absolute font-normal text-[36px] tracking-[0] leading-[normal]">
            Discover new truths
          </div>
          <div className="absolute w-[808px] top-0 left-0 [font-family:'Helvetica-Bold',Helvetica] font-bold text-black text-[48px] tracking-[0] leading-[normal]">
            Explore
          </div>
        </div>
        <div className="absolute w-[1440px] h-[2006px] top-[2253px] left-0 bg-[#205b45]">
          <div className="inline-flex flex-col h-[2006px] items-center justify-center gap-[150px] px-0 py-[100px] relative left-[50px]">
            <div className="relative w-[1202px] h-[1134px]">
              <p className="absolute h-[79px] top-0 left-[68px] [font-family:'HeliosExt-Bold',Helvetica] font-bold text-white text-[64px] text-center tracking-[0] leading-[normal]">
                What Can I Do With RIBBIT?
              </p>
              <div className="inline-flex flex-col items-center gap-[50px] absolute top-[154px] left-0">
                <div className="inline-flex items-start gap-[75px] relative flex-[0_0_auto]">
                  <div className="relative w-[352px] h-[465px]">
                    <div className="absolute w-[350px] h-[350px] top-0 left-0 bg-[#f3fffa] rounded-[175px]">
                      <img
                        className="absolute w-[265px] h-[266px] top-[43px] left-[42px]"
                        alt="Group"
                        src="https://c.animaapp.com/J4mqQRea/img/group-73@2x.png"
                      />
                    </div>
                    <div className="absolute h-[90px] top-[375px] left-[48px] [font-family:'Lexend',Helvetica] font-normal text-white text-[36px] text-center tracking-[0] leading-[normal]">
                      Share Reviews
                      <br />
                      and Ratings
                    </div>
                  </div>
                  <div className="relative w-[352px] h-[465px]">
                    <div className="absolute w-[350px] h-[350px] top-0 left-0 bg-[#f3fffa] rounded-[175px]">
                      <img
                        className="absolute w-[316px] h-[316px] top-[17px] left-[17px]"
                        alt="Mask group"
                        src="https://c.animaapp.com/J4mqQRea/img/mask-group-1@2x.png"
                      />
                    </div>
                    <div className="absolute h-[90px] top-[375px] left-[5px] [font-family:'Lexend',Helvetica] font-normal text-white text-[36px] text-center tracking-[0] leading-[normal]">
                      Remain Completely
                      <br />
                      Anonymous
                    </div>
                  </div>
                  <div className="relative w-[352px] h-[465px] mr-[-2.00px]">
                    <div className="absolute w-[350px] h-[350px] top-0 left-0 bg-[#f3fffa] rounded-[175px]">
                      <img
                        className="absolute w-[203px] h-[204px] top-[71px] left-[74px]"
                        alt="Group"
                        src="https://c.animaapp.com/J4mqQRea/img/group-72@2x.png"
                      />
                    </div>
                    <div className="absolute h-[90px] top-[375px] left-[23px] [font-family:'Lexend',Helvetica] font-normal text-white text-[36px] text-center tracking-[0] leading-[normal]">
                      Share Your
                      <br />
                      Sudden Thoughts
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-start gap-[75px] relative flex-[0_0_auto]">
                  <div className="relative w-[352px] h-[465px]">
                    <div className="absolute w-[350px] h-[350px] top-0 left-0 bg-[#f3fffa] rounded-[175px]">
                      <img
                        className="absolute w-[316px] h-[316px] top-[17px] left-[17px]"
                        alt="Mask group"
                        src="https://c.animaapp.com/J4mqQRea/img/mask-group@2x.png"
                      />
                    </div>
                    <div className="h-[90px] top-[375px] left-[56px] [font-family:'Lexend',Helvetica] text-white text-center absolute font-normal text-[36px] tracking-[0] leading-[normal]">
                      Discover New
                      <br />
                      Communities
                    </div>
                  </div>
                  <div className="relative w-[352px] h-[465px] mr-[-2.00px]">
                    <div className="absolute w-[350px] h-[350px] top-0 left-0 bg-[#f3fffa] rounded-[175px]">
                      <img
                        className="absolute w-[227px] h-[227px] top-[62px] left-[61px]"
                        alt="Group"
                        src="https://c.animaapp.com/J4mqQRea/img/group@2x.png"
                      />
                    </div>
                    <div className="absolute h-[90px] top-[375px] left-[26px] [font-family:'Lexend',Helvetica] font-normal text-white text-[36px] text-center tracking-[0] leading-[normal]">
                      Respond to Daily
                      <br />
                      Themed Prompts
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-[1342px] h-[439px] mr-[-2.00px]">
              <div className="absolute h-[79px] top-0 left-[211px] [font-family:'HeliosExt-Bold',Helvetica] font-bold text-white text-[64px] text-center tracking-[0] leading-[normal]">
                Explore Trending Topics
              </div>
              <div className="absolute w-[1340px] h-[285px] top-[154px] left-0">
                <div className="absolute w-[1340px] h-[75px] top-0 left-0">
                  <div className="flex w-[664px] h-[75px] items-center justify-center gap-[10px] px-[114px] py-[29px] absolute top-0 left-0 bg-[#f3fffa] rounded-[20px] overflow-hidden">
                    <div className="relative w-fit mt-[-15.00px] mb-[-13.00px] [font-family:'Lexend',Helvetica] font-normal text-[#202c1a] text-[36px] text-center tracking-[0] leading-[normal]">
                      Technology
                    </div>
                  </div>
                  <div className="flex w-[646px] h-[75px] items-center justify-center gap-[10px] px-[114px] py-[29px] absolute top-0 left-[694px] bg-[#f3fffa] rounded-[20px] overflow-hidden">
                    <div className="relative w-fit mt-[-15.00px] mb-[-13.00px] [font-family:'Lexend',Helvetica] font-normal text-[#202c1a] text-[36px] text-center tracking-[0] leading-[normal]">
                      Lifestyle
                    </div>
                  </div>
                </div>
                <div className="absolute w-[1339px] h-[75px] top-[105px] left-0">
                  <div className="w-[537px] flex h-[75px] items-center justify-center gap-[10px] px-[114px] py-[29px] absolute top-0 left-0 bg-[#f3fffa] rounded-[20px] overflow-hidden">
                    <div className="relative w-fit mt-[-15.00px] mb-[-13.00px] [font-family:'Lexend',Helvetica] font-normal text-[#202c1a] text-[36px] text-center tracking-[0] leading-[normal]">
                      Education
                    </div>
                  </div>
                  <div className="w-[400px] left-[566px] flex h-[75px] items-center justify-center gap-[10px] px-[114px] py-[29px] absolute top-0 bg-[#f3fffa] rounded-[20px] overflow-hidden">
                    <div className="relative w-fit mt-[-15.00px] mb-[-13.00px] ml-[-39.50px] mr-[-39.50px] [font-family:'Lexend',Helvetica] font-normal text-[#202c1a] text-[36px] text-center tracking-[0] leading-[normal]">
                      Entertainment
                    </div>
                  </div>
                  <div className="flex w-[343px] h-[75px] items-center justify-center gap-[10px] px-[114px] py-[29px] absolute top-0 left-[996px] bg-[#f3fffa] rounded-[20px] overflow-hidden">
                    <div className="relative w-fit mt-[-15.00px] mb-[-13.00px] [font-family:'Lexend',Helvetica] font-normal text-[#202c1a] text-[36px] text-center tracking-[0] leading-[normal]">
                      Travel
                    </div>
                  </div>
                </div>
                <div className="absolute w-[1338px] h-[75px] top-[210px] left-px">
                  <div className="w-[467px] flex h-[75px] items-center justify-center gap-[10px] px-[114px] py-[29px] absolute top-0 left-0 bg-[#f3fffa] rounded-[20px] overflow-hidden">
                    <div className="relative w-fit mt-[-15.00px] mb-[-13.00px] [font-family:'Lexend',Helvetica] font-normal text-[#202c1a] text-[36px] text-center tracking-[0] leading-[normal]">
                      Gaming
                    </div>
                  </div>
                  <div className="w-[841px] left-[497px] flex h-[75px] items-center justify-center gap-[10px] px-[114px] py-[29px] absolute top-0 bg-[#f3fffa] rounded-[20px] overflow-hidden">
                    <div className="relative w-fit mt-[-15.00px] mb-[-13.00px] [font-family:'Lexend',Helvetica] font-normal text-[#202c1a] text-[36px] text-center tracking-[0] leading-[normal]">
                      Do It Yourself Crafts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed w-[1442px] top-0 h-[150px] left-0">
          <div className="relative w-[1440px] h-[150px] shadow-[0px_4px_20px_#215b4599] [background:linear-gradient(180deg,rgb(243,255,250)_0%,rgb(201.05,224.53,215.83)_100%)]">
            <div className="w-[190px] top-[51px] left-[625px] text-[#669281] text-[48px] text-center whitespace-nowrap absolute [font-family:'HeliosExt-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
              RIBBIT
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
