import React, { useState } from 'react';

interface ChristianGlossaryProps {
  onBack: () => void;
}

const glossaryTerms = [
  { term: 'Abide', definition: 'To remain in close relationship with Jesus, living according to His teachings.' },
  { term: 'Accepting Christ', definition: 'Receiving Jesus as Lord and Saviour, acknowledging His sacrifice for sin.' },
  { term: 'Accountability', definition: 'Being responsible to others for one\'s actions and spiritual growth.' },
  { term: 'Angels', definition: 'Heavenly beings created by God to serve Him and assist believers.' },
  { term: 'Antichrist', definition: 'A figure who opposes Christ and deceives many in the end times.' },
  { term: 'Atonement', definition: 'Jesus\' sacrificial death that reconciles humanity with God.' },
  { term: 'Backslide', definition: 'Falling away from one\'s faith or spiritual commitment.' },
  { term: 'Baptism', definition: 'A public declaration of faith in Christ, symbolising spiritual cleansing.' },
  { term: 'Born Again', definition: 'Experiencing spiritual rebirth through faith in Jesus Christ.' },
  { term: 'Calling', definition: 'God\'s unique purpose and mission for an individual\'s life.' },
  { term: 'Carnal', definition: 'Living according to fleshly desires rather than spiritual principles.' },
  { term: 'Christ', definition: 'The eternal Son of God, fully divine and fully human, who came to earth to accomplish salvation for humanity through His life, death, and resurrection.' },
  { term: 'Commitment', definition: 'A dedicated and unwavering devotion to God and His teachings.' },
  { term: 'Communion', definition: 'A sacred practice remembering Jesus\' sacrifice through the sharing of bread and wine.' },
  { term: 'Confess', definition: 'To admit one\'s sins to God and seek His forgiveness.' },
  { term: 'Consecration', definition: 'The act of dedicating oneself fully to God\'s service.' },
  { term: 'Conviction', definition: 'A strong belief or persuasion by the Holy Spirit about sin, righteousness, and judgment.' },
  { term: 'Cross', definition: 'The instrument of Jesus\' crucifixion, symbolising His sacrifice for humanity\'s sins.' },
  { term: 'Demons', definition: 'Evil spiritual beings opposed to God, often causing harm and deception.' },
  { term: 'Denying Self', definition: 'Choosing to put aside personal desires to follow Jesus\' teachings.' },
  { term: 'Devil', definition: 'The chief adversary of God and humanity, also known as Satan.' },
  { term: 'Devotions', definition: 'Regular practices of prayer, Bible reading, and worship to grow closer to God.' },
  { term: 'Disciple', definition: 'A follower of Jesus who learns from His teachings and lives according to His example.' },
  { term: 'Discipleship', definition: 'The process of growing in faith and helping others to follow Jesus.' },
  { term: 'Divinity', definition: 'The nature of being God or having divine attributes.' },
  { term: 'Doctrine', definition: 'The set of beliefs held and taught by a church or other Christian organisation, based on the Bible.' },
  { term: 'Election', definition: 'God\'s sovereign choice of individuals or groups for a specific purpose or salvation.' },
  { term: 'End Times', definition: 'The period leading up to the return of Jesus Christ and the final judgment.' },
  { term: 'Evangelism', definition: 'The act of sharing the good news of Jesus Christ with others.' },
  { term: 'Faith', definition: 'Trust and belief in God and His promises, often without physical evidence.' },
  { term: 'Family of God', definition: 'The collective group of believers who are spiritually adopted as God\'s children.' },
  { term: 'Fasting', definition: 'Voluntarily abstaining from food or other pleasures to focus on prayer and spiritual growth.' },
  { term: 'Fellowship', definition: 'The sharing of faith, support, and community among believers.' },
  { term: 'Filled with the Holy Spirit', definition: 'Being empowered and guided by the Holy Spirit who dwells within for Christian living and service.' },
  { term: 'Freedom in Christ', definition: 'The liberation from sin and legalism through faith in Jesus.' },
  { term: 'Fruit of the Spirit', definition: 'The qualities produced in a believer\'s life by the Holy Spirit, such as love, joy, and peace.' },
  { term: 'Gifts', definition: 'Special abilities given by God to believers for the purpose of serving others.' },
  { term: 'Gifts of the Spirit', definition: 'Supernatural abilities given by the Holy Spirit to believers for the edification of the Church.' },
  { term: 'Glorification', definition: 'The final transformation of believers into a perfect state in God\'s presence.' },
  { term: 'Godhead', definition: 'The triune nature of God, consisting of the Father, the Son, and the Holy Spirit.' },
  { term: 'Gospel', definition: 'The good news of Jesus Christ\'s life, death, and resurrection for the salvation of humanity.' },
  { term: 'Grace', definition: 'God\'s unmerited favour and love bestowed upon humanity, received through faith in Jesus Christ.' },
  { term: 'Great Commission', definition: 'Jesus\' command to His disciples to spread the Gospel to all nations.' },
  { term: 'Holiness', definition: 'The state of being set apart for God\'s purposes and living a life that reflects His character.' },
  { term: 'Holy Ghost', definition: 'Another term for the Holy Spirit, the third person of the Trinity.' },
  { term: 'Holy Spirit', definition: 'The Spirit of God who dwells in believers, guiding and empowering them.' },
  { term: 'Intercession or Interceding', definition: 'Praying on behalf of others, seeking God\'s intervention and blessings.' },
  { term: 'Invitation', definition: 'The call to accept Jesus Christ as Lord and Saviour.' },
  { term: 'Jesus', definition: 'The Son of God, Saviour of the world, who became human to save humanity through His death and resurrection.' },
  { term: 'Judgment', definition: 'God\'s righteous evaluation of individuals, leading to reward or punishment.' },
  { term: 'Justification', definition: 'Being declared righteous before God through faith in Jesus Christ.' },
  { term: 'Laborers', definition: 'Believers who work to spread the Gospel and serve in God\'s kingdom.' },
  { term: 'Last Days', definition: 'The period leading up to the return of Jesus Christ and the end of the world.' },
  { term: 'Lord\'s Supper', definition: 'A Christian practice commemorating Jesus\' last meal with His disciples, involving bread and wine.' },
  { term: 'Lordship', definition: 'The authority and rule of Jesus Christ over all aspects of a believer\'s life.' },
  { term: 'Lucifer', definition: 'The original name of Satan before his fall from heaven due to pride and rebellion.' },
  { term: 'Meditate', definition: 'To contemplate and deeply reflect on God\'s Word.' },
  { term: 'Messiah', definition: 'The \'anointed one\' sent by God to save humanity, fulfilled in Jesus Christ.' },
  { term: 'Millennium', definition: 'The prophesied thousand-year reign of Christ on earth, mentioned in Revelation.' },
  { term: 'New Creation', definition: 'The transformed state of a person who has accepted Christ, living a renewed life.' },
  { term: 'New Nature', definition: 'The spiritual nature given to believers, enabling them to live according to God\'s will.' },
  { term: 'Old Nature', definition: 'The sinful nature inherent in humans before accepting Christ.' },
  { term: 'Original Sin', definition: 'The first act of disobedience by Adam and Eve, resulting in humanity\'s fallen state.' },
  { term: 'Prayer', definition: 'Communicating with God through praise, confession, thanksgiving, and requests.' },
  { term: 'Predestination', definition: 'The doctrine that God has foreordained all events and outcomes, including salvation.' },
  { term: 'Purity', definition: 'Living a life free from sin and moral corruption, reflecting God\'s holiness.' },
  { term: 'Quiet Time', definition: 'A personal time set aside for prayer, Bible study, and reflection on God.' },
  { term: 'Rapture', definition: 'The event when believers are taken away to meet Christ before the end times.' },
  { term: 'Rebirth', definition: 'The spiritual renewal and transformation that occurs when one accepts Christ.' },
  { term: 'Receiving Christ', definition: 'Accepting Jesus as Lord and Saviour, inviting Him into one\'s life.' },
  { term: 'Recommitment', definition: 'Renewing one\'s dedication and commitment to follow Jesus.' },
  { term: 'Redemption', definition: 'The act of Jesus saving humanity from sin through His death and resurrection.' },
  { term: 'Regeneration', definition: 'The process of being spiritually reborn and renewed by the Holy Spirit.' },
  { term: 'Repent', definition: 'To turn away from sin and seek forgiveness, committing to a new way of life.' },
  { term: 'Renewal', definition: 'The ongoing process of spiritual growth and transformation in a believer\'s life.' },
  { term: 'Resurrection', definition: 'Jesus Christ\'s rising from the dead on the third day after His crucifixion, signifying victory over sin and death.' },
  { term: 'Revival', definition: 'A period of renewed spiritual interest and growth within a community or church.' },
  { term: 'Righteousness', definition: 'The state of being morally right or justifiable, often attributed to believers through faith in Christ.' },
  { term: 'Salvation', definition: 'The deliverance from sin and its consequences, granted by God\'s grace through faith in Jesus Christ.' },
  { term: 'Sanctification', definition: 'The ongoing process of being made holy, set apart for God\'s purposes.' },
  { term: 'Satan', definition: 'The adversary of God and humanity, also known as the devil, who seeks to lead people away from God.' },
  { term: 'Second Coming', definition: 'The future return of Jesus Christ to earth to judge the living and the dead.' },
  { term: 'Servanthood', definition: 'The attitude and practice of serving others selflessly, following Jesus\' example.' },
  { term: 'Sinful nature', definition: 'The inherent tendency of humans to sin, inherited from Adam and Eve.' },
  { term: 'Sin', definition: 'Any action, thought, or attitude that goes against God\'s will and laws.' },
  { term: 'Sinner', definition: 'A person who commits sin, which includes all humanity apart from Christ.' },
  { term: 'Son of God', definition: 'A title affirming Jesus Christ\'s divine nature and His unique relationship with God the Father.' },
  { term: 'Soul', definition: 'The immaterial essence of a person, which is eternal and distinct from the body.' },
  { term: 'Soul Winner', definition: 'A person who actively seeks to lead others to faith in Jesus Christ.' },
  { term: 'Sovereignty', definition: 'God\'s supreme power and authority over all creation.' },
  { term: 'Surrender', definition: 'Yielding one\'s will and life to God\'s control and guidance.' },
  { term: 'Testimony', definition: 'A personal account of one\'s faith journey and experiences with God.' },
  { term: 'The Blood', definition: 'The sacrificial blood of Jesus, which cleanses believers from sin.' },
  { term: 'The Body of Christ', definition: 'The collective community of believers in Jesus.' },
  { term: 'The Book of Life', definition: 'A heavenly record of those granted eternal life through faith in Christ.' },
  { term: 'The Bride of Christ', definition: 'The Church, which is spiritually united with Christ.' },
  { term: 'The Church', definition: 'The community of believers who gather to worship God and follow Jesus Christ.' },
  { term: 'The Fall', definition: 'The event when Adam and Eve sinned, resulting in humanity\'s separation from God.' },
  { term: 'The Flesh', definition: 'The sinful nature of humans that opposes God\'s Spirit.' },
  { term: 'The Harvest', definition: 'The gathering of souls into God\'s kingdom, often associated with evangelism.' },
  { term: 'The Lamb', definition: 'A title for Jesus, symbolising His sacrificial death for sin.' },
  { term: 'The Son', definition: 'A title for Jesus Christ, emphasizing His relationship with God the Father.' },
  { term: 'The Spirit', definition: 'Another term for the Holy Spirit, the third person of the Trinity.' },
  { term: 'The World', definition: 'The secular and often sinful system of values and practices opposed to God\'s kingdom.' },
  { term: 'Tithe', definition: 'The practice of giving a tenth of one\'s income to support the church and its ministries.' },
  { term: 'Trials', definition: 'Difficult situations or challenges that test a believer\'s faith and character.' },
  { term: 'Tribulation', definition: 'A period of great suffering and distress, often associated with the end times.' },
  { term: 'Trinity', definition: 'The Christian doctrine of one God in three persons: Father, Son, and Holy Spirit.' },
  { term: 'Walk', definition: 'The manner in which a believer lives out their faith daily.' },
  { term: 'Witness', definition: 'Sharing one\'s faith and the message of Jesus Christ with others.' },
  { term: 'Works', definition: 'Actions and deeds that reflect one\'s faith and obedience to God.' },
  { term: 'Worldly', definition: 'Being focused on or influenced by secular and materialistic values rather than spiritual ones.' },
  { term: 'Worship', definition: 'The act of showing reverence and adoration for God through various forms of praise.' },
  { term: 'Yield', definition: 'To submit or give way to God\'s will and direction in one\'s life.' }
];

export default function ChristianGlossary({ onBack }: ChristianGlossaryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const filteredTerms = glossaryTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = selectedLetter === 'All' || item.term.charAt(0).toUpperCase() === selectedLetter;
    return matchesSearch && matchesLetter;
  });

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-800 to-orange-900 backdrop-blur-sm px-4 py-4 flex items-center justify-between border-b border-gray-700/50 shadow-lg flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg">Christian Glossary</span>
            <span className="text-orange-400 text-sm font-medium">Simplifying Christian Terms</span>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Whether you're new to the faith or just curious, you'll soon notice that Christians often use special terms and phrases. This glossary is here to help you understand common Christian terms, breaking down the mystery with easy-to-read, one-sentence definitions.
          </p>
          <p className="text-orange-400 text-sm">
            <strong>Seeking Clarity:</strong> If you come across a term that's unclear, don't hesitate to ask a more experienced Christian, your Bible study leader, or your pastor for clarification.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Alphabet Filter */}
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedLetter('All')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedLetter === 'All'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedLetter === letter
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terms List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-gray-400 mb-4">
            Showing {filteredTerms.length} of {glossaryTerms.length} terms
          </div>
          
          <div className="space-y-4">
            {filteredTerms.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-orange-500 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {item.term.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-2">{item.term}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.definition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No terms found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
