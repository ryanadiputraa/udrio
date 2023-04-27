import Image from "next/image"

import InstagramIco from "assets/svg/instagram-ico.svg"
import FacebookIco from "assets/svg/facebook-ico.svg"

export default function Footer() {
  return (
    <footer className="w-full py-4 border-solid border-grey border-t-[0.1rem]">
      <div className="flex sm:flex-row flex-col gap-8 justify-between items-start max-w-7xl mx-auto sm:px-40 px-[8%]">
        <div>
          <h1 className="text-xl font-bold mb-2">UD Rio Digital Printing</h1>
          <p className="text-gray-500">
            Jln. Tadulako No. 18 Palu - Sulawesi Tengah <br />
            Telp./WA:{" "}
            <a
              className="font-bold"
              href="https://wa.me/08114548080"
              target="_blank"
              rel="noreferrer"
            >
              08114548080
            </a>
            <br />
            Email:{" "}
            <a
              className="font-bold"
              href="mailto:riodigitalprintingpalu@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              riodigitalprintingpalu@gmail.com
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Social Media</h2>
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/ud.riopalu/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={InstagramIco}
                width={40}
                height={40}
                alt="instagram"
              />
            </a>
            <a
              href="https://web.facebook.com/profile.php?id=100057309315891"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={FacebookIco} width={40} height={40} alt="instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
