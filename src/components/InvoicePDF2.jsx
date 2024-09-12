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
          <Text style={[styles.header, styles.arabicText]}>وزارة السكن و العمران و المدينة</Text>
          <Text style={[styles.header, styles.arabicText]}>ديوان الترقية و التسيير العقاري لولاية جانت</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.arabicText]}>    رقـم التسجيل التجــــاري :23 ب0612083-00/56</Text>
        <Text style={styles.arabicText}>   رقم التسجيل الجبائي :002356061208368</Text> <Text style={styles.arabicText}> {formatDate(invoice.selectDeliveryDateto19)}: إلى</Text>
        <Text style={styles.arabicText}>  بنك الفلاحة والتنمية الريفية وكالة جانت  </Text>
        <Text style={styles.arabicText}>  رقم : 00300941000055230049   </Text>
        <Text style={styles.arabicText}>  رقم الهاتف : 78 10 48 029  </Text>
        <Text style={styles.arabicText}>   رقم الفاكس : 78 10 48 029  </Text>
        <Text style={[styles.header, styles.arabicText]}>فاتــــــورة إيجـــــــــار رقم : {invoice.Invoicenumber19}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>الأشهر</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>التأخر</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>الأجرة الشهرية</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>حقوق الطابع</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>TVA 19%</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>المجموع</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.months19}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.Delay19}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.price19}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.stampmoney19}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.TVA19}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.arabicText]}>{invoice.FinalP19}</Text></View>
          </View>
        </View>
      </View>
      
    </Page>
  </Document>
);

export default InvoicePDF;
