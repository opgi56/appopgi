// src/components/InvoicePDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import formatDate from '../function/formatDate';
import logo from '../assets/logo.png';

// Register font for Arabic text
import cairoFont from '../assets/fonts/Cairo/static/Cairo-Regular.ttf';

Font.register({
  family: 'Cairo',
  src: cairoFont,
  fonts: [
    {
      src: cairoFont, // Arabic font file path
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    padding: 20,
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    position: 'absolute',
    left: 20,
    top: 0,
  },
  headerTextContainer: {
    textAlign: 'center',
  },
  header: {
    fontSize: 13,
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '16.6%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
    textAlign: 'center',
  },
  arabicText: {
    fontFamily: 'Cairo', // Use the registered Arabic-supporting font
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 2,
  },
});

const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* First Invoice Section */}
      <View style={styles.headerContainer}>
        <Image src={logo} style={styles.logo} />
        <View style={styles.headerTextContainer}>
          <Text style={[styles.header, styles.arabicText]}>  الجمهورية الجزائرية الديمقراطية الشعبية</Text>
          <Text style={[styles.header, styles.arabicText]}>ديوان الترقية و التسيير العقاري لولاية جانت</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.arabicText]}>   {invoice.invoiceId}: إيصال رقم</Text>
        <Text style={styles.arabicText}>  {formatDate(invoice.selectDeliveryDatefrom)}: الفترة من</Text> <Text style={styles.arabicText}> {formatDate(invoice.selectDeliveryDateto)}: إلى</Text>
        <Text style={styles.arabicText}> {invoice.clientName}: الإسم و اللقب</Text>
        <Text style={styles.arabicText}> {invoice.clientCity}: الموقع</Text>
        <Text style={styles.arabicText}> {invoice.clientStreet}: الحي</Text>
        <Text style={styles.arabicText}>  {invoice.clientPhone}: رقم الهاتف </Text>
        
        <View style={styles.table}>
          <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>المجموع</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>TVA 09%</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>حقوق الطابع</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>الأجرة الشهرية</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>التأخر</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>الأشهر</Text></View>

          </View>
          <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.FinalP}</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.TVA}</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.stampmoney}</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.price}</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.Delay}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.months}</Text></View>
  
        </View>
        </View>
      </View>
      {/* second Invoice Section */}
      <View style={styles.headerContainer}>
        <Image src={logo} style={styles.logo} />
        <View style={styles.headerTextContainer}>
          <Text style={[styles.header, styles.arabicText]}>  الجمهورية الجزائرية الديمقراطية الشعبية</Text>
          <Text style={[styles.header, styles.arabicText]}>ديوان الترقية و التسيير العقاري لولاية جانت</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.arabicText]}>   {invoice.Invoicenumber}: إيصال رقم</Text>
        <Text style={styles.arabicText}>  {formatDate(invoice.selectDeliveryDatefrom)}: الفترة من</Text> <Text style={styles.arabicText}> {formatDate(invoice.selectDeliveryDateto)}: إلى</Text>
        <Text style={styles.arabicText}> {invoice.clientName}: الإسم و اللقب</Text>
        <Text style={styles.arabicText}> {invoice.clientCity}: الموقع</Text>
        <Text style={styles.arabicText}> {invoice.clientStreet}: الحي</Text>
        <Text style={styles.arabicText}>  {invoice.clientPhone}: رقم الهاتف </Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>الأشهر</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>التأخر</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>الأجرة الشهرية</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>حقوق الطابع</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>TVA 09%</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>المجموع</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.months}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.Delay}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.price}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.stampmoney}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.TVA}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.FinalP}</Text></View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
