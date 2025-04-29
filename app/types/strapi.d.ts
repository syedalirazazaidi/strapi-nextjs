export interface StrapiPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  
  export interface StrapiMeta {
    pagination: StrapiPagination;
  }
  
  export interface StrapiResponse<T> {
    data: T[];
    meta: StrapiMeta;
  }
  
  export interface Feature {
    id: number;
    title: string;
  }
  
  export interface Banner {
    id: number;
    documentId: string;
    text: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }