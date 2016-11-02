#!/usr/bin/perl

use strict;
use CGI;
use CGI::Carp qw(fatalsToBrowser); 
use LWP;
use XML::Simple;
use Data::Dumper;

my $q = new CGI;
my $feedURL = "http://feeds.feedburner.com/EmrAndHipaa?format=xml";

# create object
my $xml = new XML::Simple;
my $browser = LWP::UserAgent->new;
my $response = $browser->get($feedURL);
my $XMLFeedData = $response->{_content};

# read XML file
my $data = $xml->XMLin($XMLFeedData);

# print output
my @item = @{$data->{channel}->{item}};
my $item = @item;

print $q->header;
print <<HTML;
<html>
<head>
<META HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">
<title>Breaking News</title>
<style>
.feedtext {
	font-family: Arial, Verdana, Tahoma, "Lucinda Grande", Geneva, Helvetica, sans-serif;
	font-size: 11pt;
	text-align: left;
	vertical-align: top;
	padding-left: 7px;
	padding-right: 5px;
	background: #fbf5df;
	color: #000;
	text-decoration: none;
}

a:link  {
	color: #000;
	text-decoration: none;
}

.feeddate  {
	font-family: Arial, Verdana, Tahoma, "Lucinda Grande", Geneva, Helvetica, sans-serif;
	font-size: 8.5pt;
	text-align: left;	
}

.spacer   {
	font-family: Arial, Verdana, Tahoma, "Lucinda Grande", Geneva, Helvetica, sans-serif;
	font-size: 7pt;
	text-align: left;
}

.subheads2 {
	font-family: Arial, Verdana, Tahoma, "Lucinda Grande", Geneva, Helvetica, sans-serif;
	font-size: 12pt;
	color: #303474;
	font-weight: bold;
	align: center;
}

</style>
</head>
<body bgcolor="#fbf5df">
<span class="subheads2">Breaking News</span>
<p>

HTML


my $item_count = 0;

foreach (@item) {	
	$_->{title} =~ s/\x{2013}/-/g;
	my @date = split /\ /,$_->{pubDate};
	$date[0] =~ s/\,//;

	$item_count++;
# 		<span class="feeddate">$date[0] $date[2] $date[1], $date[3]</span><br>	
	print <<NEWS;
	
	<div class="feedtext">
		<a href="$_->{guid}->{content}" target="_blank">
		$_->{title}</a><br>
		<span class="spacer">&nbsp;</span>
	
	</div>
NEWS
	
}
print "</body></html>";

exit
