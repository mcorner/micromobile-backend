require 'find'
require 'json'

LOGS_DIR='/Users/mcorner/logs'
BANNED= ['true','undefined',"[Object]"]

Dir.glob("#{LOGS_DIR}/**/000000").each do |path|
#  puts path
  event = {};
  eventAt = lambdaRequestId = platform = deviceId = eventType = eventSubtype = userAgent = advertisingIdentifier = vendorIdentifier = webIdentifier = referrer = impression = nil

  File.readlines(path).each do |line|
    if (/START RequestId/ =~ line )
      lambdaRequestId = line.split()[3]
      eventAt = line.split()[0]
#      puts "START: " + lambdaRequestId
    end
    if (/^\s*platform: / =~ line )
      parsed_platform = line.split()[1].gsub("\'","").chomp(',')
      platform = parsed_platform
    end
    if (/^\s*deviceId: / =~ line )
      parsed_deviceId = line.split()[1].gsub("\'","").chomp(',')
      deviceId = parsed_deviceId
    end
    if (/^\s*eventType: / =~ line )
      parsed_eventType = line.split()[1].gsub("\'","").chomp(',')
      eventType = parsed_eventType unless BANNED.include?(parsed_eventType)
    end
    if (/^\s*eventSubtype: / =~ line )
      parsed_eventSubtype = line.split()[1].gsub("\'","").chomp(',')
      eventSubtype = parsed_eventSubtype unless BANNED.include?(parsed_eventSubtype)
    end
    if (/^\s*userAgent: / =~ line )
      parsed_userAgent = line.split(':')[1].chomp.chomp(',').chomp("\'")[2..-1]
      userAgent = parsed_userAgent unless BANNED.include?(parsed_userAgent)
    end
    if (/^\s*advertisingIdentifier: / =~ line )
      parsed_advertisingIdentifier = line.split()[1].gsub("\'","").chomp(',')
      advertisingIdentifier = parsed_advertisingIdentifier unless BANNED.include?(parsed_advertisingIdentifier)
    end
    if (/^\s*vendorIdentifier: / =~ line )
      parsed_vendorIdentifier = line.split()[1].gsub("\'","").chomp(',')
      vendorIdentifier = parsed_vendorIdentifier unless BANNED.include?(parsed_vendorIdentifier)
    end
    if (/^\s*webIdentifier: / =~ line )
      parsed_webIdentifier = line.split()[1].gsub("\'","").chomp(',')
      webIdentifier = parsed_webIdentifier unless BANNED.include?(parsed_webIdentifier)
    end
    if (/^\s*impression: / =~ line )
      parsed_impression = line.split()[1].gsub("\'","").chomp(',')
      impression = parsed_impression unless BANNED.include?(parsed_impression)
    end
    if (/^\s*referrer: / =~ line )
      parsed_referrer = line.split()[1].gsub("\'","").chomp(',')
      referrer = parsed_referrer unless BANNED.include?(parsed_referrer)
    end

    if (/END RequestId/ =~ line )
      event = {"eventAt" => eventAt, "lambdaRequestId" => lambdaRequestId, "platform" => platform, "deviceId" => deviceId, "eventType" => eventType, "eventSubtype" => eventSubtype, "userAgent" => userAgent, "advertisingIdentifier" => advertisingIdentifier, "vendorIdentifier" => vendorIdentifier, "webIdentifier" => webIdentifier, "impression" => impression, "referrer" => referrer}
      puts event.to_json

  eventAt = lambdaRequestId = platform = deviceId = eventType = eventSubtype = userAgent = advertisingIdentifier = vendorIdentifier = webIdentifier = referrer = impression = nil
    end
  end
end
