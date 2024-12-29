"use client";
import TextField from "@/components/ui/text-field";
import React, { useEffect, useState, useCallback } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import RadioInput from "@/components/ui/radio-input";
import SelectField from "@/components/ui/select-field";
import DateInput from "@/components/ui/date-input";
import TextArea from "@/components/ui/textArea-field";
import TableLaboratorium from "@/components/view/pendaftaran-pasien-laboratorium/table/TableLaboratorium";
import UploadPhotoField from "@/components/ui/uploadPhoto-field";
import dataWilayah from "@/utils/config";

const PendaftaranPasienBaru = () => {
  const methods = useForm({
    defaultValues: {
      title: "",
      no_registrasi: "",
      no_rm: "",
      no_ktp: "",
      namaLengkapPasien: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      pasienPrioritas: "",
      statusPasien: "",
      suku: "",
      agama: "",
      kewarganegaraan: "",
      negara: "",
      pasien_provinsi: "",
      pasien_kabupaten: "",
      pasien_kecamatan: "",
      pasien_kelurahan: "",
      // Data keluarga
      keluarga_provinsi: "",
      keluarga_kabupaten: "",
      keluarga_kecamatan: "",
      keluarga_kelurahan: "",
      photoPasien: "",
    },
    mode: "onSubmit",
  });

  // terbaru dibuat oleh hamzah

  // fungsi untuk menselect pada rujukan

  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  //  const untuk header pada table laboratorium
  const headers = ["NO", "PEMERIKSAAN LAB", "JUMLAH", "ACTION"];

  const { setValue, watch } = methods;
  const title = watch("title");
  const kewarganegaraan = watch("kewarganegaraan");
  const negara = watch("negara");

  useEffect(() => {
    // Hanya memanggil setValue jika nilai title berubah
    if (title === "Mr" || title === "Tn" || title === "Ms") {
      setValue("jenisKelamin", "Laki-Laki");
    } else if (
      title === "Mrs" ||
      title === "Miss" ||
      title === "Ny" ||
      title === "Nn"
    ) {
      setValue("jenisKelamin", "Perempuan");
    } else {
      setValue("jenisKelamin", "");
    }
  }, [title, setValue]);

  useEffect(() => {
    // Mengoptimalkan pemanggilan setValue berdasarkan kewarganegaraan dan negara
    if (kewarganegaraan === "WNI" && negara !== "Indonesia") {
      setValue("negara", "Indonesia");
    } else if (kewarganegaraan === "WNA" && negara !== negara) {
      setValue("negara", negara);
    }
  }, [kewarganegaraan, negara, setValue]);

  const [pasienSelectedProvinsi, setPasienSelectedProvinsi] = useState("");
  const [pasienFilteredKabupaten, setPasienFilteredKabupaten] = useState([]);
  const [pasienFilteredKecamatan, setPasienFilteredKecamatan] = useState([]);
  const [pasienFilteredKelurahan, setPasienFilteredKelurahan] = useState([]);

  const [keluargaSelectedProvinsi, setKeluargaSelectedProvinsi] = useState("");
  const [keluargaFilteredKabupaten, setKeluargaFilteredKabupaten] = useState(
    []
  );
  const [keluargaFilteredKecamatan, setKeluargaFilteredKecamatan] = useState(
    []
  );
  const [keluargaFilteredKelurahan, setKeluargaFilteredKelurahan] = useState(
    []
  );

  // Gunakan useCallback untuk mencegah pembuatan ulang fungsi handleProvinsiChange
  const handleChange = useCallback(
    (type, field, value) => {
      if (type === "pasien") {
        if (field === "provinsi") {
          setPasienSelectedProvinsi(value);
          const selected = dataWilayah.find((item) => item.provinsi === value);
          setPasienFilteredKabupaten(selected ? selected.kabupaten : []);
          setValue("pasien_provinsi", value);
        } else if (field === "kabupaten") {
          const selectedKabupaten = pasienFilteredKabupaten.find(
            (item) => item.nama === value
          );
          setPasienFilteredKecamatan(
            selectedKabupaten ? selectedKabupaten.kecamatan : []
          );
          setValue("pasien_kabupaten", value);
        } else if (field === "kecamatan") {
          const selectedKecamatan = pasienFilteredKecamatan.find(
            (item) => item.nama === value
          );
          setPasienFilteredKelurahan(
            selectedKecamatan ? selectedKecamatan.kelurahan : []
          );
          setValue("pasien_kecamatan", value);
        }
      } else if (type === "keluarga") {
        if (field === "provinsi") {
          setKeluargaSelectedProvinsi(value);
          const selected = dataWilayah.find((item) => item.provinsi === value);
          setKeluargaFilteredKabupaten(selected ? selected.kabupaten : []);
          setValue("keluarga_provinsi", value);
        } else if (field === "kabupaten") {
          const selectedKabupaten = keluargaFilteredKabupaten.find(
            (item) => item.nama === value
          );
          setKeluargaFilteredKecamatan(
            selectedKabupaten ? selectedKabupaten.kecamatan : []
          );
          setValue("keluarga_kabupaten", value);
        } else if (field === "kecamatan") {
          const selectedKecamatan = keluargaFilteredKecamatan.find(
            (item) => item.nama === value
          );
          setKeluargaFilteredKelurahan(
            selectedKecamatan ? selectedKecamatan.kelurahan : []
          );
          setValue("keluarga_kecamatan", value);
        }
      }
    },
    [
      pasienFilteredKabupaten,
      pasienFilteredKecamatan,
      keluargaFilteredKabupaten,
      keluargaFilteredKecamatan,
      setValue,
    ]
  );

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <Col lg="12">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h3 className="card-title tracking-wide">
                {" "}
                Registrasi Laboratorium
              </h3>
            </div>
          </div>
          <div className="card-body">
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="iq-card-header m-1">
                <Row>
                  <Row>
                    <Col lg="6">
                      <TextField
                        label="No.Registrasi :"
                        name="no_registrasi"
                        type="text"
                        placeholder="belum tersedia"
                        className="form-control mb-0"
                        rules={{
                          required: "No Registrasi is required",
                          pattern: {
                            value: 2,
                            message: "Invalid username format",
                          },
                        }}
                      />
                    </Col>
                  </Row>
                  <Col lg="6">
                    <TextField
                      label="No.RM Lama :"
                      name="no_rm"
                      type="text"
                      placeholder="Enter No RM"
                      className="form-control mb-0"
                      rules={{
                        required: "No RM Lama is required",
                        pattern: {
                          value: 2,
                          message: "Invalid username format",
                        },
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Nama Lengkap :"
                      name="namaLengkapPasien"
                      type="text"
                      placeholder="Enter Nama Lengkap Sendiri"
                      className="form-control mb-0"
                      rules={{
                        required: "Nama Lengkap Sendiri is required",
                        pattern: {
                          value: 2,
                          message: "Invalid Nama Lengkap Sendiri",
                        },
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Tempat Lahir :"
                      name="tempatLahir"
                      type="text"
                      placeholder="Enter Nama Lengkap Sendiri"
                      className="form-control mb-0"
                      rules={{
                        required: "Nama Lengkap Sendiri is required",
                        pattern: {
                          value: 2,
                          message: "Invalid Nama Lengkap Sendiri",
                        },
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <DateInput
                      name="tanggalLahir"
                      label="Tanggal Lahir"
                      placeholder={"Enter Tanggal Lahir"}
                      rules={{ required: "Tanggal lahir harus diisi" }} // Aturan validasi
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="jenisKelamin"
                      label="Jenis Kelamin"
                      options={[
                        { label: "Laki-Laki", value: "Laki-Laki" },
                        { label: "Perempuan", value: "Perempuan" },
                      ]}
                      placeholder="Pilih Jenis Kelamin"
                      rules={{ required: "Jenis Kelamin is required" }}
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Nomor Telepon  :"
                      name="kantor"
                      type="text"
                      placeholder="Enter nomor telepon Pasien..."
                      className="form-control mb-0"
                      rules={{
                        required: "nomor telepon pasien is required",
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="No Hp :"
                      name="noHp"
                      type="text"
                      placeholder="Enter your no Hp..."
                      className="form-control mb-0"
                      rules={{
                        required: "No Hp is required",
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Email :"
                      name="email"
                      type="email"
                      placeholder="Enter email Pasien..."
                      className="form-control mb-0"
                      rules={{
                        required: "Email is required",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <TextArea
                      label="Alamat Rumah*"
                      name="informasiAlamat"
                      placeholder="Masukkan Informasi Alamat Pasien..."
                      rules={{
                        required: "Informasi Alamat Pasien harus diisi",
                      }}
                      rows={5}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <SelectField
                      name="pasien_provinsi"
                      label="Provinsi Pasien"
                      options={dataWilayah.map((item) => ({
                        label: item.provinsi,
                        value: item.provinsi,
                      }))}
                      placeholder="Pilih Provinsi"
                      rules={{ required: "Provinsi pasien harus diisi" }}
                      className="mb-3"
                      onChange={(e) =>
                        handleChange("pasien", "provinsi", e.target.value)
                      }
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="pasien_kabupaten"
                      label="Kabupaten"
                      options={pasienFilteredKabupaten.map((item) => ({
                        label: item.nama,
                        value: item.nama,
                      }))}
                      placeholder="Pilih Kabupaten"
                      rules={{ required: "Kabupaten is required" }}
                      className="mb-3"
                      onChange={(e) =>
                        handleChange("pasien", "kabupaten", e.target.value)
                      }
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="pasien_kecamatan"
                      label="Kecamatan"
                      options={pasienFilteredKecamatan.map((item) => ({
                        label: item.nama,
                        value: item.nama,
                      }))}
                      placeholder="Pilih Kecamatan"
                      rules={{ required: "Kecamatan is required" }}
                      className="mb-3"
                      onChange={(e) =>
                        handleChange("pasien", "kecamatan", e.target.value)
                      }
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="pasien_kelurahan"
                      label="Kelurahan"
                      options={pasienFilteredKelurahan.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      placeholder="Pilih Kelurahan"
                      rules={{ required: "Kelurahan is required" }}
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="12">
                    <Col lg="3">
                      <TextField
                        label="Kode Pos :"
                        name="kodePos"
                        type="text"
                        placeholder="Enter Kode Pos..."
                        className="form-control mb-0"
                        rules={{
                          required: "Kode Pos is required",
                        }}
                      />
                    </Col>
                  </Col>
                </Row>
              </div>
              <div className="iq-card-header m-1">
                <div className="iq-header-title">
                  <h4 className="card-title my-2 "> Registrasi </h4>
                </div>
                <Row>
                  <Col lg="6">
                    <RadioInput
                      name="tipePasien"
                      label="Tipe Pasien *"
                      options={[
                        { label: "Umum", value: "umum" },
                        { label: "Penjamin", value: "penjamin" },
                      ]}
                      rules={{ required: "tipe pasien is required" }}
                      className="d-flex gap-5 "
                    />
                  </Col>
                  <Col lg="12">
                    <SelectField
                      name="penjamin"
                      label="Penjamin"
                      options={[
                        { label: "BPJS", value: "bpjs" },
                        { label: "Non BPJS", value: "non-bpjs" },
                      ]}
                      placeholder="Pilih Penjamin"
                      rules={{ required: "Penjamin is required" }}
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="6">
                    <DateInput
                      name="tanggalRegistrasi"
                      label="Tanggal Registrasi"
                      placeholder={"Enter Tanggal Registrasi"}
                      rules={{ required: "Tanggal Registrasi harus diisi" }} // Aturan validasi
                      className="mb-3"
                    />
                  </Col>
                  <div className="iq-card-header m-1">
                    <div className="iq-header-title">
                      <h4 className="card-title my-2 "> Dirujuk </h4>
                    </div>
                    <Row>
                      <Col lg="6">
                        <RadioInput
                          name="kursul"
                          options={[{ label: "Kursul", value: "kursul" }]}
                          rules={{ required: "kursul is required" }}
                          className="d-flex gap-5 mt-2"
                          onChange={() => handleRadioChange("kursul")}
                        />
                      </Col>
                      <Col lg="6">
                        <SelectField
                          name="pilihPromo"
                          options={[
                            {
                              label: "bad anak discount 20%",
                              value: "badAnak",
                            },
                            {
                              label: "bad dewasa discount 10%",
                              value: "badDewasa",
                            },
                          ]}
                          placeholder="Pilih Kursul"
                          rules={{ required: "Pilih Kursul is required" }}
                          className="mb-3"
                          onChange={(e) => handleSelectChange("kursul")}
                          disabled={
                            selectedOption && selectedOption !== "kursul"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <RadioInput
                          name="LuarRs"
                          options={[{ label: "Luar Rs", value: "LuarRs" }]}
                          rules={{ required: "Luar Rs is required" }}
                          className="d-flex gap-5 mt-2"
                          onChange={() => handleRadioChange("LuarRs")}
                        />
                      </Col>
                      <Col lg="6">
                        <SelectField
                          name="pilihRs"
                          options={[
                            { label: "Rsu", value: "Rsu" },
                            { label: "Rsk", value: "Rsk" },
                            { label: "Rb", value: "Rb" },
                          ]}
                          placeholder="Pilih rs"
                          rules={{ required: "Pilih rs is required" }}
                          className="mb-3"
                          onChange={(e) => handleSelectChange("LuarRs")}
                          disabled={
                            selectedOption && selectedOption !== "LuarRs"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <RadioInput
                          name="atasPermintaanSendiri"
                          options={[
                            {
                              label: "Atas Permintaan Sendiri",
                              value: "atasPermintaanSendiri",
                            },
                          ]}
                          rules={{
                            required: "Atas Permintaan Sendiri is required",
                          }}
                          className="d-flex gap-5 mt-2 mb-3"
                          onChange={() =>
                            handleRadioChange("atasPermintaanSendiri")
                          }
                        />
                      </Col>
                    </Row>
                  </div>

                  <Col lg="6">
                    <SelectField
                      name="pilihPromo"
                      label="Pilih Promo"
                      options={[
                        { label: "bad anak discount 20%", value: "badAnak" },
                        {
                          label: "bad dewasa discount 10%",
                          value: "badDewasa",
                        },
                      ]}
                      placeholder="Pilih Promo"
                      rules={{ required: "Promo is required" }}
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="tipePemeriksaan"
                      label="Tipe Pemeriksaan"
                      options={[
                        { label: "Psikologi Klinik", value: "psikologiKlink" },
                        { label: "Poli Jantung", value: "poliJantung" },
                      ]}
                      placeholder="Tipe Pemeriksaan"
                      rules={{ required: "Tipe Pemeriksaan is required" }}
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="12">
                    <RadioInput
                      name="suratRujukan"
                      label="Surat Rujukan"
                      options={[
                        { label: "Ada", value: "ada" },
                        { label: "Tidak Ada", value: "tidakAda" },
                      ]}
                      rules={{ required: "Surat Rujukan is required" }}
                      className="d-flex gap-5 "
                    />
                  </Col>
                  <Col lg="6">
                    <TextArea
                      label="Diagnosa Awal"
                      name="diagnosaAwal"
                      placeholder="Masukkan Diagnosa Awal Pasien..."
                      rules={{
                        required: "Informasi  diagnosa awal pasien harus diisi",
                      }}
                      rows={5}
                    />
                  </Col>
                  <Col lg="6">
                    <DateInput
                      name="tanggalSampling"
                      label="Tanggal Sampling"
                      placeholder={"Enter Tanggal Sampling"}
                      rules={{ required: "Tanggal Registrasi harus diisi" }} // Aturan validasi
                      className="mb-3"
                    />
                  </Col>
                </Row>
              </div>
              <div className="iq-card-header m-1">
                <TableLaboratorium
                  headers={headers}
                  title="Pemeriksaan Laboratory"
                  id="id"
                />
              </div>
              <div className="iq-card-header m-1">
                <Row>
                  <Col lg="6">
                    <SelectField
                      name="dokterPemeriksa"
                      label="Dokter Pemeriksa"
                      options={[
                        { label: "dr. sutanti ayu", value: "psikologiKlink" },
                        { label: "dr. Budi", value: "poliJantung" },
                      ]}
                      placeholder="Dokter Pemeriksa"
                      rules={{ required: "Dokter Pemeriksa is required" }}
                      className="mb-3"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <RadioInput
                      name="permintaanTestCito"
                      label="Permintaan Test Cito"
                      options={[
                        { label: "Ya", value: "ya" },
                        { label: "Tidak", value: "Tidak" },
                      ]}
                      rules={{ required: "Permintaan Test Cito is required" }}
                      className="d-flex gap-5 "
                    />
                  </Col>
                </Row>

                <Row className="justify-content-start my-3">
                  <Col lg="12">
                    <Button className="btn btn-xl btn-warning me-3">
                      Simpan
                    </Button>
                    <Button className="btn btn-xl btn-warning me-3 ">
                      Batal
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </div>
        </div>
      </Col>
    </FormProvider>
  );
};

export default PendaftaranPasienBaru;
